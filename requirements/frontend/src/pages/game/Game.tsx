import NavBar from "../../components/NavBar"
import { useEffect, useRef, useState } from "react"
import { GameAthentication } from "../../api/game"
import { HOST, PORT } from "../../config"
import Waiting from "./components/Waiting"
import ProfileCard from "./components/ProfileCrad"









const Game = ()  =>{

    const connection = useRef<null | WebSocket>(null)

    useEffect(() => {

        const gameWebsocket = async () =>{
            const uuid = await GameAthentication();
            console.log(uuid);
            const socket = new WebSocket(`ws://${HOST}:${PORT}/ws/GameQueue/?uuid=${uuid}`)
            socket.addEventListener("open", (event:any) => {
                socket.send("Connection established")
              })
          
              // Listen for messages
              socket.addEventListener("message", (event) => {
                console.log("Message from server ", event.data)
              })
          
              connection.current = socket;
        }
        gameWebsocket();

      return () => connection.current?.close()
    }, [])
    return (
        <div className="w-full flex flex-col items-center ">
            <NavBar/>        
                <div className=" bg-gradient-to-t from-gray-200 to-white w-1/2 h-[30vh] flex justify-center items-center rounded-2xl shadow-md">

                    <div className="bg-white w-80 h-80 rounded-lg flex flex-col items-center shadow-lg ">

                        <ProfileCard/>
                        <Waiting/>
                    </div>

                </div>
        </div>)
}



export default Game;