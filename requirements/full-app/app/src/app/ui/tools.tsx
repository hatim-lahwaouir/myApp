
interface InputName{
    name: string,
}

const Input: React.FC<InputName> = ({name} : InputName) =>{

    return (        
        <input type="text" id="first_name" className="w-full shadow appearance-none border border-white-900 rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                    placeholder={name} required />
    )
}



const Button: React.FC<InputName> = ({name} : InputName) =>{

    return (<> 
       <button type="button" className="bg-[#a0d2eb]  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"  >{name}</button>
    </>)
}


export {Input, Button};