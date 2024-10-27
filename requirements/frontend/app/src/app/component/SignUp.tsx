import { Input , Button}from "../ui/tools";
import {SubmitErrorHandler, useForm } from "react-hook-form";

type FormFields = {
    username: string,
    email : string,
    password : string,

}



const SignUpForm = () =>{

    const {register, handleSubmit , setError , formState:{errors , isSubmitting}} = useForm<FormFields>({ mode: "onChange",reValidateMode: "onChange" });
    const onSubmit:SubmitErrorHandler<FormFields> = (data) =>{
        console.log(data)
    }
    handleSubmit(onSubmit);


    return (
        <form className="flex flex-col  h-[60%] w-[90%] justify-around mt-10 items-center " onSubmit={handleSubmit(onSubmit)}>

            <Input name="Username" register={register} registerName="username" validation={ {validate : (value:string) => { return /^[a-zA-Z0-9._]+$/.test(value) || "Usernames can only use letters, numbers, underscores and periods." } } } />
            {/* ^[^@]+@[^@]+\.[a-zA-Z]{2,}$ */}
            {errors.username && <span className="text-red-500"> { errors.username.message} </span>}
            <Input name="Email" register={register} registerName="email"  validation={ {validate : (value:string) => { return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value) || "Enter a valid email address." } } } />
            {errors.email && <span className="text-red-500"> { errors.email.message} </span>}
            <Input name="Password"  register={register} registerName="password" validation={ {validate : (value:string) => { return value.length < 10 || "Create a password at least 6 characters long." } } } />
            {errors.password && <span className="text-red-500"> { errors.password.message} </span>}
            
            
            <Button name={isSubmitting ? "Welcome!" : "is Submitting "} type="submit" disabled={isSubmitting} />
            {errors.root && <span className="text-red-500"> { errors.root.message} </span>}

    </form>)
}
// 

const SignUp: React.FC<LoginProps> = ({ setOption }) => {
    
    const handleLoginClick = () => {
        setOption('Login');
      };
      
      

    return (
        <div className="w-[50%] min-w-96  max-w-3xl h-[50%] rounded-md flex bg-[#000000]"> 

            
            <div className=" w-full flex flex-col items-center  pl-5 pt-10 ">
                
                <div className="mt-5 flex flex-col h-[20%]  justify-around  w-[90%] ">
                    <h1 className="text-3xl text-[#ffffff] " >Welcome!  </h1> 
                    <h1 className="text-3xl text-[#ffffff]"  > Sign up now to begin your adventure with us.</h1>
                    <p className="  mt-5 text-sm text-gray-500 text-[#1B1212] text-opacity-75 " > If you already have an account ?
                    <span   className="cursor-pointer   text-sm text-[#ffffff] " onClick={handleLoginClick}> Login </span>
                    </p>
                    
                </div>
                
                <SignUpForm/>   
                

            </div>
        </div>
    );
}

export default SignUp;

// black #1B1212
// white #e5eaf5