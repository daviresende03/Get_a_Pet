const User = require('../models/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const createUserToken = require('../helpers/create-users-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmpassword} = req.body

        // Validations
        if(!name){
            res.status(422).json({message: 'Campo nome é obrigatório'})
            return
        }

        if(!email){
            res.status(422).json({message: 'Campo email é obrigatório'})
            return
        }

        if(!phone){
            res.status(422).json({message: 'Campo telefone é obrigatório'})
            return
        }

        if(!password){
            res.status(422).json({message: 'Campo senha é obrigatório'})
            return
        }

        if(!confirmpassword){
            res.status(422).json({message: 'Campo confirmação da senha é obrigatório'})
            return
        }

        if(password !== confirmpassword){
            res.status(422).json({message: 'Campo confirmação de senha deve ser igual ao campo senha'})
            return
        }

        const userExist = await User.findOne({email:email})
        if(userExist){
            res.status(422).json({message: 'Email já cadastrado!'})
            console.log(email);
            console.log(userExist)
            return
        }

        // create a pass
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            phone,
            password: passwordHash,
        })

        try {
            const newUser = await user.save()
          
            await createUserToken(newUser,req,res)
            return
        } catch (error) {
            res.status(500).json({message: error})
            return
        }
    }
    static async login(req,res) {
        const { email, password } = req.body
        
        if(!email){
            res.status(422).json({message: 'Campo email é obrigatório'})
            return
        }
        if(!password){
            res.status(422).json({message: 'Campo senha é obrigatório'})
            return
        }

        // check if user exists
        const user = await User.findOne({ email: email})

        if(!user){
            res.status(422).json({message: 'Email não cadastrado!'})
            return
        }

        // chechk is password match with dbPass
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            res.status(422).json({message: 'Senha inválida!'})
            return
        }

        await createUserToken(user,req,res)
    }
    static async checkUser(req,res) {
        let currentUser

        if(req.headers.authorization){
            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')
            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined
        }else{
            currentUser = null
        }
        res.status(200).send(currentUser)
    }
    static async getUserById(req, res){
        const id = req.params.id // get url params
        
        const user = await User.findById(id).select("-password") // delete a password prop. of userObj
        if(!user){
            res.status(422).json({message: 'Usuário não encontrado!'})
            return
        }
        res.status(200).json({ user })
    }
    static async editUser(req,res) {
        const id = req.params.id
        const { name, email, phone, password, confirmpassword } = req.body
        
        // check if user exist
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(req.file){
            user.image = req.file.filename
        }
        
        // validations
        if(!name){
            res.status(422).json({message: 'Campo nome é obrigatório'})
            return
        }
        user.name = name

        if(!email){
            res.status(422).json({message: 'Campo email é obrigatório'})
            return
        }
        
        const userExistsByEmail = await User.findOne({email})
        if(user.email !== email && userExistsByEmail){
            return res.status(422).json({message:"Email já em uso"})
        }
        user.email = email

        if(!phone){
            res.status(422).json({message: 'Campo telefone é obrigatório'})
            return
        }
        user.phone = phone

        if(password !== confirmpassword){
            return res.status(422).json({message:"Campo confirmação de senha deve ser igual ao campo senha"})
        } else if(password == confirmpassword && password != null){
            // creating password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)
            user.password = passwordHash
        }
        try {
            // updated user data
            await User.findOneAndUpdate(
                {_id: user._id}, //filter to execute update
                {$set: user}, //new data
                {new: true},
            )
            res.status(200).json({
                message: 'Usuário atualizado com sucesso'
            })
        } catch (err) {
            res.status(500).json({message: err})
            return
        }

    }
}
