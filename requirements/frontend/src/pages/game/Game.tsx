import NavBar from "../../components/NavBar"
import { useEffect, useRef, useState } from "react"
import { GameAthentication } from "../../api/game"
import { HOST, PORT } from "../../config"
import { json } from "react-router-dom"




const Waiting = () =>{
    const  arr = ["Waiting.", "Waiting..", "Waiting..."]
    const  [waiting, setWaiting] = useState(arr[0]);
    
    useEffect(() => {
        let index = 0;
        const intervalId = setInterval( () => {
            index = (index + 1) % 3
            setWaiting(arr[index]);
        }, 800);
    
        return () => clearInterval(intervalId);
    }, [])


    return <h1  > {waiting} </h1>;

}



const ProfileCard = () => {
    
    const UserObject = localStorage.getItem("userInfo") 
    let res;
    if (UserObject){
        res = JSON.parse(UserObject);
    }

    return <div className="flex flex-col mt-10 items-center  ">
        <span className="w-20 h-20 bg-black rounded-full">  </span>
        <span className="mt-3 text-2xl font-semibold"> Player id {res?.id} </span>
        <span className="text-stone-500 text-sm" > @{res?.username} </span>
    </div>


}
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
                <div className=" bg-gradient-to-t from-gray-200 to-white w-1/2 h-[50vh] flex justify-center items-center">

                    <div className="bg-white w-80 h-80 rounded-lg flex flex-col items-center">

                        <ProfileCard/>
                        <Waiting/>
                    </div>

                </div>
        </div>)
}



export default Game;