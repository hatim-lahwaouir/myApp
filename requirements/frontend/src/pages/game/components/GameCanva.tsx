import { useEffect, useRef } from "react"
import { GameAthentication } from "../../../api/game"
import { HOST, PORT } from "../../../config"

interface GameCanvasProps {
    gameId : string,
}







// const map : string[][] =[   ['1','1', '1', '1', '1', '1', '1', '1', '1', '1', '1' , '1' , '1', '1'],
//                             ['1','1', '1', '1', '1', '1', '1', '1', '1', '1', '1' , '1' , '1', '1'],
//                             ['1','1', '1', '1', '1', '1', '1', '1', '1', '1', '1' , '1' , '1', '1'],
//                             ['1','1', '1', '1', '1', '1', '1', '1', '1', '1', '1' , '1' , '1', '1'],
//                             ['1','0', '0', '0', '1', '0', '1', '0', '1', '0', '0' , '0' , '1', '1'],
//                             ['1','1', '0', '1', '1', '0', '1', '0', '1', '0', '1' , '0' , '1', '1'],
//                             ['1','1', '0', '1', '1', '0', '1', '0', '1', '0', '1' , '0' , '1', '1'],
//                             ['1','1', '0', '1', '1', '0', '1', '0', '1', '0', '1' , '0' , '1', '1'],
//                             ['1','1', '0', '1', '1', '0', '0', '0', '1', '0', '1' , '0' , '1', '1'],
//                             ['1','1', '0', '1', '1', '1', '1', '0', '1', '0', '0' , '0' , '1', '1'],
//                             ['1','0', '0', '0', '1', '1', '0', '1', '1', '1', '1' , '1' , '1', '1'],
//                             ['1','1', '1', '1', '1', '0', '1', '1', '1', '1', '1' , '1' , '1', '1'],
//                             ['1','1', '1', '1', '1', '1', '1', '1', '1', '1', '1' , '1' , '1', '1'],
//                             ['1','1', '1', '1', '1', '1', '1', '1', '1', '1', '1' , '1' , '1', '1'],
//                         ]



const drawMap = (m:string[][], context:CanvasRenderingContext2D, canvas:HTMLCanvasElement) =>{
    context.fillStyle = '#FFFFFF'
    context.fillRect(0, 0, canvas.width, canvas.height)
    console.log(m.length);
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


const drawPlayer = (y:number, x:number, context:CanvasRenderingContext2D) => {

    context.fillStyle = '#8b5cf6' ;
    context.arc(x, y, 7 , 0, 2 * Math.PI);
    context.fill();

    context.beginPath();
    context.moveTo(x, y);

    context.stroke();
}











const GameCanva = ({gameId}:GameCanvasProps) => {

    const connection = useRef<null | WebSocket>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
  
    useEffect(() => {
    
        const gameWebSocketSetup = async () =>{
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
            console.log(message);
    
            drawMap(message?.map, context, canvas);
            const playePosition = message?.playePosition;
            drawPlayer(playePosition[1], playePosition[0], context);

            })
            const handelClicks = (event: KeyboardEvent) =>{
                const allowedKeys = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];
            
                if (allowedKeys.includes(event.key)) {
                    // The event key is one of ArrowUp, ArrowDown, ArrowRight, or ArrowLeft
                    
                    connection.current?.send(JSON.stringify({"move" :  event.key}));
                }
                
            
            }
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