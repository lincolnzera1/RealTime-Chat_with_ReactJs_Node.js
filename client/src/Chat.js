import React, { useEffect, useState } from 'react'
import './Chat.css'
import { v4 as uuidv4 } from "uuid";

import io from "socket.io-client"
const socket = io.connect("http://localhost:3001")
socket.on('connect', () => console.log("A new user has been connected"))

const myId = uuidv4()

const Chat = () => {

    const [message, setMessage] = useState("")
    const [lista, setLista] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()  
        
        socket.emit("send.message", {
            id: myId,
            message
        })

       /*   setLista([... lista, {
            id: myId,
            message
        }])  */
        setMessage("")
    }

    const handleInputChange = (e) => {
        setMessage(e.target.value)
    }

    
    useEffect(() => {
        console.log("alou")

        const handleNewMessage = newMessage =>
            setLista([...lista, newMessage])
        
            console.log("A lista é: " + lista)
        socket.on('send.message', handleNewMessage)
        return () => socket.off('send.message', handleNewMessage)
    }, [lista])

  return (
    <div>
        
        <form onSubmit={handleSubmit}>
            <input type="text" name="nome" id="nome" onChange={handleInputChange} value={message}/>
            <input type="submit" value="Send Message" onSubmit={handleSubmit}/>
        </form>
       
       <ul>
            {lista.map((item, index) => (
                <li key={index} className={item.id === myId ? "list-mine" : "list-other"}>
                    <span className={item.id === myId ? "mine" : "other"}>{item.message}</span>
                </li>
            ))}
       </ul>
    </div>
  )
}

export default Chat