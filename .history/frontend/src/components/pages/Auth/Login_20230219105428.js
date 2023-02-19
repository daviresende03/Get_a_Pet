import { useState, useContext } from "react"
import Input from "../../form/Input"
import styles from "../../form/Form.module.css"
import { Context } from "../../../context/UserContext"
import { Link } from "react-router-dom"

function Login() {
    const [user, setUser] = useState({})
    const {login} = useContext(Context)
    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
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
                    placeHolder="Digite sua senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Entrar" />
            </form>
            <p>
                Não possui uma conta? <Link to="/register">Registrar</Link>
            </p>
        </section>
    )
}

export default Login