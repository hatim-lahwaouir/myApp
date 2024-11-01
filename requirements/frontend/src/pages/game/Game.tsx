import NavBar from "../../components/NavBar"
import { useEffect, useRef } from "react"
import { GameAthentication } from "../../api/game"

const Game = ()  =>{

    // const connection = useRef<null | WebSocket>(null)

    useEffect(() => {


        GameAthentication();
    //   const socket = new WebSocket("ws://127.0.0.1:800")
  
    //   // Connection opened
    //   socket.addEventListener("open", (event:any) => {
    //     socket.send("Connection established")
    //   })
  
    //   // Listen for messages
    //   socket.addEventListener("message", (event) => {
    //     console.log("Message from server ", event.data)
    //   })
  
    //   connection.current = socket;
  
    //   return () => connection.current?.close()
    }, [])
    return (
        <div className="w-full flex flex-col items-center">
            <NavBar/>        
                <div className="bg-black w-screen h-[80vh] flex justify-center items-center">

                    <div className="bg-white w-1/2 h-52">


                    </div>

                </div>
        </div>)
}



export default Game;