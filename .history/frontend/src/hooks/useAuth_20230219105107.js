//api
import api from "../utils/api";

//hooks
import {useState, useEffect} from 'react'
import{useNavigate} from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
    const {setFlashMessage} = useFlashMessage()
    const [authenticated, setAuthenticated] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    async function register(user) {
        let msg = ''
        let msgType = ''
        try {
            const data = await api.post('/users/register', user).then((res) => {
                return res.data
            })
            msg = data.message
            msgType = 'success'
            await authUser(data)
        } catch (err) {
            msg = err.response.data.message
            msgType = 'error'
        }
        setFlashMessage(msg,msgType)
    }

    async function authUser(data) {
        setAuthenticated(true)

        localStorage.setItem('token',JSON.stringify(data.token))
        navigate('/')
    }

    function logout(){
        const msgText = 'Logout realizado com sucesso!'
        const msgType = 'success'
        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        navigate('/login')

        setFlashMessage(msgText,msgType)
    }

    async function login(user) {
        let msg = ''
        let msgType = ''
        try {
            const data = await api.post('/users/register', user).then((res) => {
                return res.data
            })
            msg = data.message
            msgType = 'success'
            await authUser(data)
        } catch (err) {
            msg = err.response.data.message
            msgType = 'error'
        }
        setFlashMessage(msg,msgType)
    }

    return { authenticated, register, logout }
}
