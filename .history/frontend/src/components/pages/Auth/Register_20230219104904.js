import Input from "../../form/Input"
import styles from "../../form/Form.module.css"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"

import { Context } from "../../../context/UserContext"

function Register() {
    const [user, setUser] = useState({})
    const { register } = useContext(Context)

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault(e) // form não recarregar a pagina

        // enviar user ao bd
        register(user)
    }

    return (
        <section className={styles.form_container}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
                <Input 
                    text="Nome"
                    type="text"
                    name="name" //backend
                    placeHolder="Digite seu nome"
                    handleOnChange={handleChange}
                />
                <Input 
                    text="Telefone"
                    type="text"
                    name="phone" //backend
                    placeHolder="Digite seu telefone"
                    handleOnChange={handleChange}
                />
                <Input 
                    text="Email"
                    type="email"
                    name="email" //backend
                    placeHolder="Digite seu email"
                    handleOnChange={handleChange}
                />
                <Input 
                    text="Senha"
                    type="password"
                    name="password" //backend
                    placeHolder="Digite sua senha"
                    handleOnChange={handleChange}
                />
                <Input 
                    text="Confirmação de senha"
                    type="password"
                    name="confirmpassword" //backend
                    placeHolder="Digite sua senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Cadastrar" />
            </form>
            <p>
                Já possui uma conta? <Link to="/login">Login</Link>
            </p>
        </section>
    )
}

export default Register