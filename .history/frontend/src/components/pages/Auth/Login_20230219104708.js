import { useState, useContext } from "react"
import Input from "../../form/Input"
import styles from '../../form/Form.modules.css'
import { Context } from "../../../context/UserContext"

function Login() {
    function handleChange(e) {
        
    }
    return (
        <section className={styles.form_container}>
            <h1>Login</h1>
            <form>
                <Input
                    type="email"
                    text="Email"
                    name="email"
                    placeHolder="Digite seu email"
                    handleOnChange={handleChange}
                />
                <Input
                    type="password"
                    text="Senha"
                    name="password"
                    placeHolder="Digite sua Senha"
                    handleOnChange={handleChange}
                />
            </form>
        </section>
    )
}

export default Login