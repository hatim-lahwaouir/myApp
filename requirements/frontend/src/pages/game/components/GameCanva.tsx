import { useEffect, useRef } from "react"
import { GameAthentication } from "../../../api/game"
import { HOST, PORT } from "../../../config"

interface GameCanvasProps {
    gameId : string,
}






const drawMap = (m:string[][], context:CanvasRenderingContext2D, canvas:HTMLCanvasElement) =>{
    context.fillStyle = '#FFFFFF'
    context.fillRect(0, 0, canvas.width, canvas.height)
    const squarSize = canvas.width / m.length ;
    
    for (let x = 0; x < m.length; x++){
        for(let y = 0; y < m.length; y++){
            if (x == 0 || y == 0 || x == m.length - 1 || y == m.length - 1){
                context.fillStyle = '#8b5cf6'
                context.fillRect(x * squarSize, y * squarSize, squarSize, squarSize)
            }
            else if (m[y][x] == '1'){
                context.fillStyle = '#000000'
                context.fillRect(x * squarSize, y * squarSize, squarSize, squarSize)
            }
        }
    }
}










let me = -1;
let playersPosition:any;
let playersDirection:any;
let m:string[][] = [[]];




const drawPlayers = ( context:CanvasRenderingContext2D) => {


    
    Object.keys(playersPosition).forEach(key => {
      const pos = playersPosition[key];
      if (+key == me){
        context.fillStyle = '#8b5cf6' ;
    }
    else{
      context.fillStyle = '#000000' ;

    }
    context.beginPath();
    context.arc(pos[0], pos[1] , 7 , 0, 2 * Math.PI);
    context.fill();

    if (+key != me){
        context.fillStyle = '#808080' ;
    }
        context.beginPath();
        context.moveTo(pos[0], pos[1]);

        console.log(playersDirection[key]);
        const endX = pos[0] + Math.cos(playersDirection[key]) * 20;
        const endY = pos[1] + Math.sin(playersDirection[key]) * 20;

        context.lineTo(endX, endY);
        context.stroke();
    })


}

const GameCanva = ({gameId}:GameCanvasProps) => {
    
    const connection = useRef<null | WebSocket>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    
    useEffect(() => {
        
        const gameWebSocketSetup = async () =>{
            const UserInfoString = localStorage.getItem("userInfo")

            if (UserInfoString)
            {
            
                const UserInf = JSON.parse(UserInfoString);
                me = UserInf?.id;
            }

            
            if (!canvas) {
                console.error('Canvas reference is null. Please ensure it\'s initialized.');
                return;
            }
            const context = canvas?.getContext('2d')
    
            if (!context) {
                console.error('Context creation failed ');
                return;
            } 
            const uuid = await GameAthentication();
            const socket = new WebSocket(`ws://${HOST}:${PORT}/ws/Game/?uuid=${uuid}&gameId=${gameId}`)
          
            socket.addEventListener("message", (event:any) => {
                const message = JSON.parse(event?.data);
            
                
                playersPosition = message?.playersPosition;
                playersDirection = message?.playersDirection;
                m = message?.map;
            })
            const handelClicks = (event: KeyboardEvent) =>{
                const allowedKeys = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "a" , "d", "A", "D", "w", "s"];
            
                console.log(event.key);
                if (allowedKeys.includes(event.key)) {
                    connection.current?.send(JSON.stringify({"move" :  event.key}));
                }
            }
            const drawGame = () =>{
                drawMap(m, context, canvas);
                drawPlayers(context);
            }

            setInterval(drawGame, 1000 / 60);
            
            addEventListener("keydown", handelClicks);
            connection.current = socket;
        }
        const canvas = canvasRef.current
        gameWebSocketSetup();

 
        
        }, [])
  return (<canvas ref={canvasRef} width={500} height={500}>
    
    
    
     </canvas>
     
    
    )
}

export default GameCanva;