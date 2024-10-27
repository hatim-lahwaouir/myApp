import { UseFormRegister } from "react-hook-form";

interface InputName{
    name: string,
    example : string,
    register: UseFormRegister<any>,
    registerName: string,
    validation:any,
}

interface ButtonInterface{
    name: string,
    type:string,
}

const Input: React.FC<InputName> = ({name, example, register, registerName, validation} : InputName) =>{

    if (!validation){
        validation = {
            required : true,
        }
    }
    return (    
        <>    
        <label className=" text-white w-full mt-5 mb-1 ml-2" > {name} </label>
        <input {...register(registerName, validation)} type="text" id="first_name" className="  text-white w-full shadow appearance-none border border-white-900 rounded-lg py-2 px-3 text-gray-700 mb-3 bg-[#000000]  leading-tight focus:outline-none focus:shadow-outline" 
                    placeholder={example} required />
        </>
    )
}



const Button: React.FC<ButtonInterface> = ({name, type} : ButtonInterface) =>{

    return (<> 
       <button type={type} className=" bg-[#ffffff] mt-3 text-[#000000] hover:bg-[#000000] transition duration-200 hover:text-[#ffffff]  font-bold py-2 px-4 rounded w-full"  >{name}</button>
    </>)
}



const SimpleInput: React.FC<InputName> = ({name, example} : InputName) =>{

    return (    
        <>    
        <label className=" text-white w-full" > {name} </label>
        <input  type="text" id="first_name" className=" text-white w-full shadow appearance-none border border-white-900 rounded-lg py-2 px-3 text-gray-700 mb-3 bg-[#000000]  leading-tight focus:outline-none focus:shadow-outline" 
                    placeholder={example} required />
        </>
    )
}



export {Input,SimpleInput, Button};
