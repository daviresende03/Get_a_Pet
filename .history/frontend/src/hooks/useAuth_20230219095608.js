//api
import api from "../utils/api";

//hooks
import {useState, useEffect} from 'react'
import{useHistory} from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
    const {setFlashMessage} = useFlashMessage()
    const [authenticated, setAuthenticated] = useState(false)

    async function register(user) {
        let msg = ''
        let msgType = ''
        try {
            const data = await api.post('/users/register', user).then((res) => {
                return res.data
            })
            msg = data.message
            msgType = 'success'
        } catch (err) {
            msg = err.response.data.message
            msgType = 'error'
        }
        setFlashMessage(msg,msgType)
    }

    async function authUser(data) {
        
    }

    return { register }
}
