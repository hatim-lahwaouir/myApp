"use client";
import { useState } from 'react';
// import { Button } from '../ui/tools';


// // how to send info in the socket
// function sendMessage(connection:any){
  
//     if (connection.current && connection.current.readyState === WebSocket.OPEN) {
//               connection.current.send({"message" : "hello"}) ;
//     }


// }


// function SocketInit(){

//   const socket = new WebSocket("ws://localhost:8000/ws/game/");
  
//   socket.addEventListener("open", (event) => {

//   })

//   socket.addEventListener("message", (event) => {
//     // incoming info 

//   })
// }


// const map =[
//   ['0', '1', '0', '0', '0', '0', '0', '0','0', '0', '0', '0', '0', '0', '0', '0'],
//   ['0', '1', '1', '0', '0', '0', '0', '0','0', '0', '0', '0', '0', '0', '0', '0'],
//   ['0', '0', '0', '0', '0', '0', '0', '0','0', '0', '0', '0', '0', '0', '0', '0'],
//   ['0', '0', '0', '0', '0', '0', '0', '0','0', '0', '0', '0', '1', '0', '0', '0'],
//   ['0', '1', '0', '0', '0', '0', '0', '0','0', '0', '0', '0', '0', '0', '0', '0'],
//   ['0', '1', '0', '0', '0', '0', '0', '0','0', '0', '0', '0', '0', '0', '0', '0'],
//   ['0', '0', '1', '0', '0', '0', '0', '0','0', '1', '0', '0', '0', '0', '0', '0'],
//   ['0', '0', '0', '0', '0', '0', '0', '0','0', '0', '0', '0', '0', '0', '0', '0'],
//   ['0', '0', '0', '0', '0', '1', '0', '0','0', '0', '0', '0', '0', '0', '0', '0'],
//   ['0', '0', '0', '0', '0', '0', '0', '0','0', '0', '0', '0', '0', '0', '0', '0'],
//   ['0', '0', '0', '0', '0', '0', '0', '0','0', '0', '0', '0', '0', '0', '0', '0'],
//   ['0', '0', '0', '0', '0', '0', '0', '0','0', '0', '0', '0', '0', '0', '0', '0'],
//   ['0', '0', '0', '0', '0', '0', '1', '0','0', '0', '0', '0', '0', '0', '0', '0'],
//   ['0', '0', '0', '0', '0', '0', '0', '0','0', '0', '0', '0', '0', '1', '0', '1'],
//   ['0', '0', '0', '0', '0', '0', '0', '0','0', '0', '0', '0', '1', '0', '1', '0'],
//   ['0', '0', '0', '0', '0', '1', '1', '1','0', '0', '0', '0', '0', '0', '0', '0'],

// ]



// function DrawMap(canvasRef:any){
//     const canvas = canvasRef.current
//     const context = canvas.getContext('2d')


//     const squarSize = context.canvas.width / 16;
//     context.fillStyle = '#000000';
//     context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    
    

//     for (var y = 0; y < 16; y++){
//       for (var x = 0; x < 16; x++){
//         if (x  == 0 || y == 0 || x == 15 || y == 15){
//           context.fillStyle = '#808080';
//           context.fillRect(squarSize * x, squarSize * y ,squarSize,  squarSize);
//         }

//         else if (map[y][x]  == '0'){
//           context.fillStyle = '#FFFFFF';
//           context.fillRect(squarSize * x, squarSize * y ,squarSize,  squarSize);

//         }
//       }
//     }
// }




// function Game() {
//     const connection = useRef(null)
//     const canvasRef = useRef(null)


//     useEffect(() => {
//       const socket = SocketInit();
//       connection.current = socket;
//       DrawMap(canvasRef);
//       return () => connection.current?.close()
//     }, [])
    
//     return (
//         <div className="bg-[#0F0F0F] w-full h-screen text-white flex justify-center items-center ">
//             <canvas  ref={canvasRef} width={400} height={400} className=" bg-white" > </canvas>
//         </div>
//     );
// }



const PrivateGame = (props:any) =>{
  return (
  <div className="min-w-96  max-w-2xl w-[50%] h-[15em] bg-white  flex flex-col items-center justify-around rounded-lg  " >

    <h2 className=" font-bold  cursor-pointer rounded-lg bg-white w-[100%] h-[2em] text-black text-2xl flex justify-center mt-3 items-cente ">  Enter Game Id : </h2>
    
    <input type="text" className="text-black pl-2 border-stone-950 w-[60%] h-[2em] border-4 focus:outline-none rounded-lg "  />

    <button className=" mt-3 bg-[#000000]  hover:bg-white hover:text-black transition duration-200   font-bold py-2 px-4 rounded w-[50%]"> Join </button>

    <button className=" mt-3 bg-[#000000]  hover:bg-white hover:text-black transition duration-200   font-bold py-2 px-4 rounded w-[50%]" onClick={() => props.setChoice('')  }> Go back to lobby </button>
    
    
    </div>
  )

}



const UserInfo = (props:any) => {
  return (
    <div className="w-[100%] mt-5 h-[3em] flex  bg-black items-center ">
        <h1 className="font-bold  cursor-pointer rounded-lg w-[50%] h-[2em]  text-1xl flex justify-center  items-cente  "> {props.id} </h1>
        <h2 className=" font-bold  cursor-pointer rounded-lg  w-[50%] h-[2em]  text-1xl flex justify-center  items-cente "> {props.username}  </h2>
    </div>
  )
}


const WaitingQueue = (props:any) =>{
  return (
  <div className="min-w-96  max-w-2xl w-[70%] h-[35em] bg-white  flex flex-col items-center  rounded-lg  " >

    { props.gameId && ( <>
      <h2 className="  font-bold  cursor-pointer rounded-lg bg-white w-[100%] h-[2em] text-black text-2xl flex justify-center mt-4 items-cente ">  Game id to join this room : </h2>
    <h1 className=" font-bold  cursor-pointer rounded-lg bg-white w-[100%] h-[2em] text-black text-1xl flex justify-center mt-2 items-cente ">  ************** </h1>
    </>
    )  
  }
  {props.gameId || ( <>   <h2 className="  font-bold  cursor-pointer rounded-lg bg-white w-[100%] h-[2em] text-black text-2xl flex justify-center mt-4 items-cente ">  Welcom to your game room: </h2>    </>)}
    <UserInfo id={10} username="Walid"/>
    <UserInfo id={10} username="Walid"/>
    <UserInfo id={10} username="Walid"/>
    <UserInfo id={10} username="Walid"/>
    <UserInfo id={10} username="Walid"/>


    <button className=" mt-3 bg-[#000000]  hover:bg-white hover:text-black transition duration-200   font-bold py-2 px-4 rounded w-[50%]" onClick={() => props.setChoice('')  }> Go back to lobby </button>
    </div>
  )

}


const Lobby  = () => {
  
  const [choice , setchoice] = useState('');

    // CG = create a GAme JG, ERG, LG
  

  if ( choice == "JG"){

    return (
    <div className="bg-[#0F0F0F] w-full h-screen text-white flex justify-center items-center flex-col ">
      <PrivateGame setChoice={setchoice} />
      </div>
    )
  }
  else if (choice == 'CG'){
    return (
    <div className="bg-[#0F0F0F] w-full h-screen text-white flex justify-center items-center flex-col ">
      <WaitingQueue setChoice={setchoice} gameId="xxxxxxxxxxxx" />
    
    </div>
      )
  }
  else if (choice == 'RG'){
    return (
      <div className="bg-[#0F0F0F] w-full h-screen text-white flex justify-center items-center flex-col ">
        <WaitingQueue setChoice={setchoice}  />
      
      </div>
        )

  }


  return (
          <div className="bg-[#0F0F0F] w-full h-screen text-white flex justify-center items-center flex-col ">
            
            
            <h1 className="min-w-96  max-w-2xl w-[70%] text-3xl flex justify-center mb-10 "  > Welcome to our Mutliplayer game ! </h1>
        
          
          
            <div className=" min-w-96  max-w-2xl w-[50%] h-[50em]  flex flex-col items-center justify-around " >  
              <h1 className=" font-bold  rounded-lg w-[100%]  text-2xl flex justify-center items-center h-[5em] "  >  Choose what you want to play </h1>
              <h1 className=" bg-[#000000]  hover:text-white hover:bg-black transition duration-200  font-bold  cursor-pointer rounded-lg bg-white w-[100%] text-black text-2xl flex justify-center items-center h-[5em] "  onClick={() => setchoice('CG')} > Create a private game </h1>
              <h1 className=" bg-[#000000]  hover:text-white hover:bg-black transition duration-200   font-bold  cursor-pointer rounded-lg bg-white w-[100%] text-black text-2xl flex justify-center items-center  h-[5em] "  onClick={() => setchoice('JG')}  > Join a private game </h1>
              <h1 className=" bg-[#000000]  hover:text-white hover:bg-black transition duration-200  font-bold cursor-pointer rounded-lg  bg-white w-[100%] text-black text-2xl flex justify-center items-center h-[5em] "  onClick={() => setchoice('RG')} >  Enter a random game </h1>
              <h1 className=" bg-[#000000]  hover:text-white hover:bg-black transition duration-200   font-bold cursor-pointer rounded-lg  bg-white w-[100%] text-black text-2xl flex justify-center items-center h-[5em] "  >  Local game </h1>
            </div>

          </div>
  )

}
export default Lobby;