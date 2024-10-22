import { Input , Button}from "../ui/tools";


interface LoginProps {
    setOption: React.Dispatch<React.SetStateAction<'Login' | 'SignUp'>>;
  }



  const Login: React.FC<LoginProps> = ({ setOption }) => {
    
    const handleSignUpClick = () => {
        setOption('SignUp');
      }; 


    return (
        <div className="w-[50%] min-w-96  max-w-3xl h-[45%] rounded-md flex  bg-[#e5eaf5]" > 

            
            <div className=" mt-5 w-full flex flex-col items-center  pl-5 pt-10 ">
                
                <div className="flex flex-col h-[20%]  justify-around  w-[90%] ">
                    <h1 className="text-3xl text-[#1B1212] " >Welcome back! </h1> 
                    <h1 className="text-3xl text-[#1B1212]"  > Login to continue your journey </h1>
                    <p className=" mt-5 text-sm text-gray-500 text-[#1B1212] text-opacity-75 " > You don't have an account account?
                    <span   className=" cursor-pointer  text-sm text-[#a0d2eb] " onClick={handleSignUpClick}> Sign up </span>
                    </p>
                    
                </div>
                
                
                <form className="flex flex-col  h-[50%] w-[90%] justify-around mt-10 items-center ">
                    <Input name="Email | Username" />
                    <Input name="Password" />
                    <Button name="Welcome!"/>
                </form>

            </div>
        </div>
    );
}

export default Login;


