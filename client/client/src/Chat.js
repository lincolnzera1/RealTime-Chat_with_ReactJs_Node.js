import React, { useEffect, useState } from 'react'
import io from "socket.io-client"
const socket = io.connect("http://localhost:3001")

const Chat = () => {

    const [message, setMessage] = useState("")
    const [lista, setLista] = useState(["1"])

    const handleSubmit = (e) => {
        e.preventDefault()
        socket.emit("send.message", {
            message: message
        })
        setLista(...lista, {
            id: 1,
            message
        })
        setMessage("")
    }

    const handleInputChange = (e) => {
        setMessage(e.target.value)
    }

    
    useEffect(() => {
        socket.on("receive.message", data => {
            alert(data.message)
        })
    }, [socket])

  return (
    <div>
        
        <form onSubmit={handleSubmit}>
            <input type="text" name="nome" id="nome" onChange={handleInputChange} value={message}/>
            <input type="submit" value="Send Message" onSubmit={handleSubmit}/>
        </form>
       
       <ul>
            {/* {lista.map((m) => (
                <li key={m.id}>{m.message}</li>
            ))} */}
       </ul>
    </div>
  )
}

export default Chat