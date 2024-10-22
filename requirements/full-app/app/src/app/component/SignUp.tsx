import { Input , Button}from "../ui/tools";


const SignUp: React.FC<LoginProps> = ({ setOption }) => {
    
    const handleLoginClick = () => {
        setOption('Login');
      };
      
      

    return (
        <div className="w-[50%] min-w-96  max-w-3xl h-[45%] rounded-md flex bg-[#e5eaf5]"> 

            
            <div className=" w-full flex flex-col items-center  pl-5 pt-10 ">
                
                <div className="mt-5 flex flex-col h-[20%]  justify-around  w-[90%] ">
                    <h1 className="text-3xl text-[#1B1212] " >Welcome!  </h1> 
                    <h1 className="text-3xl text-[#1B1212]"  > Sign up now to begin your adventure with us."</h1>
                    <p className="  mt-5 text-sm text-gray-500 text-[#1B1212] text-opacity-75 " > If you already have an account ?
                    <span   className="cursor-pointer   text-sm text-[#a0d2eb] " onClick={handleLoginClick}> Login </span>
                    </p>
                    
                </div>
                
                
                <form className="flex flex-col  h-[50%] w-[90%] justify-around mt-10 items-center ">
                    <Input name="Username" />
                    <Input name="Email" />
                    <Input name="Password" />
                    <Button name="Welcome!"/>
                </form>

            </div>
        </div>
    );
}

export default SignUp;

// black #1B1212
// white #e5eaf5