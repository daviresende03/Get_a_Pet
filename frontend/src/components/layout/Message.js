import { useEffect, useState } from 'react'
import styles from './Message.module.css'
import bus from '../../utils/bus'

function Message() {
    const [visibility, setVisibility] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')

    useEffect(() =>{ // executar apenas uma vez e evitar loads infinitos
        bus.addListener('flash', ({message, type}) => {
            setVisibility(true)
            setMessage(message)
            setType(type)
            setTimeout(() => {
                setVisibility(false) // remover mensagem apos 3 segundos
            }, 3000)
        })
    }, [])

    return (
        visibility && (
            <div className={`${styles.message} ${styles[type]}`}>{message}</div>
        )
    )
}
export default Message