import NavBar from "../../components/NavBar"
import { useEffect, useRef, useState } from "react"
import { GameAthentication } from "../../api/game"
import { HOST, PORT } from "../../config"
import Waiting from "./components/Waiting"
import ProfileCard from "./components/ProfileCrad"
import GameCanva from "./components/GameCanva"








const Game = ()  =>{

    const connection = useRef<null | WebSocket>(null)
    const [gameId , setGameId] = useState(null);

    useEffect(() => {

        const gameQueueWebSocket = async () =>{
            const uuid = await GameAthentication();
            const socket = new WebSocket(`ws://${HOST}:${PORT}/ws/GameQueue/?uuid=${uuid}`)
          
            socket.addEventListener("message", (event:any) => {
            const message = JSON.parse(event?.data);
            const type = message?.type;

            if (type == "join.game"){
                console.log("join the game")
                connection.current?.close();

                setGameId(message?.gameId);
            }
        })
          
              connection.current = socket;
        }
        gameQueueWebSocket();

      return () => connection.current?.close()
    }, [])

    
    if (gameId == null)
    {
        return (
            <div className="w-full flex flex-col items-center ">
                <NavBar/>

                    <div className="w-[100%] flex flex-col h-[70vh] justify-center items-center ">   
                        <div className=" bg-gradient-to-t from-gray-200 to-white w-4/6 h-[40vh] flex justify-center items-center rounded-2xl shadow-md">

                            <div className="bg-white w-80 h-80 rounded-lg flex flex-col items-center shadow-lg ">

                            
                            <ProfileCard/> 
                            <Waiting/> 

                            </div>

                        </div>
                    </div>
            </div>)
    }

    return (
        <div className="w-full flex flex-col items-center ">
            <NavBar/>        
                <div className=" bg-gradient-to-t from-gray-200 to-white w-1/2 h-[50vh] flex justify-center items-center rounded-2xl shadow-md">

                    <div className="bg-white w-80 h-80 rounded-lg flex flex-col items-center shadow-lg ">

                    
                        <GameCanva gameId={gameId} />
                    </div>

                </div>
        </div>)
}



export default Game;