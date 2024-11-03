import { useEffect,useState } from "react";


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


    return <h1  className="mt-4 bg-black w-28 rounded-xl text-white flex justify-center items-center  font-semibold text-xs  h-7" > {waiting} </h1>;
}




export default Waiting;