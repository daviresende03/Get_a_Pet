const Pet = require('../models/Pet')

// helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController {
    
    // create a pet
    static async create(req,res) {
        const {name,age,weight,color} = req.body
        const available = true
        const images = req.files

        // validations
        if(!name){
            res.status(422).json({message: 'Campo nome é obrigatório'})
            return
        }
        if(!age){
            res.status(422).json({message: 'Campo idade é obrigatório'})
            return
        }
        if(!weight){
            res.status(422).json({message: 'Campo peso é obrigatório'})
            return
        }
        if(!color){
            res.status(422).json({message: 'Campo cor é obrigatório'})
            return
        }
        if(images.length === 0){
            res.status(422).json({message: 'Campo imagem é obrigatório'})
            return
        }

        // get pet owner
        const token = getToken(req)
        const user = await getUserByToken(token)

        // create a pet
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            },
        })

        images.map((i) =>{
            pet.images.push(i.filename)
        })

        try {
            const newPet = await pet.save()
            res.status(201).json({
                message: 'Pet cadastrado!',
                newPet,
            })
        } catch (err) {
            res.status(500).json({message: err})
        }
    }

    static async getAll(req, res) {
        const pets = await Pet.find().sort('-createdAt') // Ordenar dos recentes para os mais antigos
        res.status(200).json({
            pets: pets,
        })
    }

    static async getMyAllUserPets(req, res) {
        const token = await getToken(req)
        const user = await getUserByToken(token)
        const pets = await Pet.find({'user._id' : user._id}).sort('-createdAt')

        res.status(200).json({
            pets: pets,
        }) 
    }

    static async getMyAllUserAdoptions(req,res) {
        const token = await getToken(req)
        const user = await getUserByToken(token)
        const pets = await Pet.find({'adopter._id' : user._id}).sort('-createdAt')

        res.status(200).json({
            pets: pets,
        }) 
    }

    static async getPetById(req,res) {
        const id = req.params.id
        if(!ObjectId.isValid(id)){
            res.status(422).json({message: 'Id inválido!'})
            return
        } 
        const pet = await Pet.findOne({_id: id})
        if(!pet){
            res.status(404).json({message: 'Pet não encontrado!'})
            return
        }
        res.status(200).json({
            pet: pet,
        })
    }

    static async removePetById(req, res) {
        const id = req.params.id
        if(!ObjectId.isValid(id)){
            res.status(422).json({message: 'Id inválido!'})
            return
        } 
        const pet = await Pet.findOne({_id: id})
        if(!pet){
            res.status(404).json({message: 'Pet não encontrado!'})
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)
        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({message: 'Houve um erro ao processar a solicitação!'})
            return
        }
        await Pet.findByIdAndRemove(id)
        res.status(200).json({message:'Pet removido com sucesso!'})
    }

    static async updatePet(req, res) {
        const {name,age,weight,color,available} = req.body
        const images = req.files
        const id = req.params.id

        const updatedData = {}

        const pet = await Pet.findOne({_id: id})
        if(!pet){
            res.status(404).json({message: 'Pet não encontrado!'})
            return
        }

        const token = await getToken(req)
        const user = await getUserByToken(token)
        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({message: 'Houve um erro ao processar a solicitação!'})
            return
        }

        if(!name){
            res.status(422).json({message: 'Campo nome é obrigatório'})
            return
        }
        updatedData.name = name
        if(!age){
            res.status(422).json({message: 'Campo idade é obrigatório'})
            return
        }
        updatedData.age = age
        if(!weight){
            res.status(422).json({message: 'Campo peso é obrigatório'})
            return
        }
        updatedData.weight = weight
        if(!color){
            res.status(422).json({message: 'Campo cor é obrigatório'})
            return
        }
        updatedData.color = color
        if(images.length === 0){
            res.status(422).json({message: 'Campo imagem é obrigatório'})
            return
        }
        updatedData.images = []
        images.map((i) => {
            updatedData.images.push(i.filename)
        })

        await Pet.findByIdAndUpdate(id,updatedData)
        res.status(200).json({message: 'Pet atualizado com sucesso!'})
    }

    static async schedule(req, res) {
        const id = req.params.id
        const pet = await Pet.findOne({_id: id})
        if(!pet){
            res.status(404).json({message: 'Pet não encontrado!'})
            return
        }

        const token = await getToken(req)
        const user = await getUserByToken(token)
        if(pet.user._id.equals(user._id)){
            res.status(422).json({message: 'Não é possível agendar visita com seu proprio Pet!'})
            return
        }

        if(pet.adopter){
            if(pet.adopter._id.equals(user._id)){
                res.status(422).json({message: 'Visita já agendada para este Pet!'})
                return
            }
        }

        if(!pet.available){
            res.status(422).json({message: 'Este Pet já foi adotado!'})
            return
        }

        pet.adopter={
            _id: user._id,
            name: user.name,
            image: user.image
        }

        await Pet.findByIdAndUpdate(id,pet)
        res.status(200).json({
            message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}.`
        })
    }

    static async concludeAdoption(req,res) {
        const id = req.params.id
        const pet = await Pet.findOne({_id: id})
        if(!pet){
            res.status(404).json({message: 'Pet não encontrado!'})
            return
        }

        const token = await getToken(req)
        const user = await getUserByToken(token)
        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({message: 'Houve um erro ao processar a solicitação!'})
            return
        }
        pet.available = false

        await Pet.findByIdAndUpdate(id, pet)
        res.status(200).json({
            message: `Parabéns! O ciclo de adoção foi finalizado com sucesso!`
        })
    }
}
