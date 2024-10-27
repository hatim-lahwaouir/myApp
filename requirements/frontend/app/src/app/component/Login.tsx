'use client';
import { Input , Button}from "../ui/tools";
import {SubmitErrorHandler, useForm } from "react-hook-form";
import {LoginAction} from "../api/user";
import { useRouter } from 'next/navigation';
type FormFields = {
    usernameOrEmail: string,
    password : string,

}

const LoginForm = () =>{

    const {register, handleSubmit , setError , formState:{errors , isSubmitting}} = useForm<FormFields>({ mode: "onChange",reValidateMode: "onChange" });
    const router = useRouter();
    const onSubmit:SubmitErrorHandler<FormFields> = async (data:any) =>{
        const res = await LoginAction(data);


        if (!res[0])
        {
            setError("root",{
                message: res[1],
            })
        }
        else{
            router.push("/profile");
        }
    }
    handleSubmit(onSubmit);


    return (
        <form className="flex flex-col  h-[60%] w-[90%] justify-around mt-10 items-center " onSubmit={handleSubmit(onSubmit)}>

            <Input name="Username Or Email" register={register} registerName="usernameOrEmail" validation={ {validate : (value:string) => { return value.length != 0 || "Enter your Username Or Email." } } } />
            <Input name="Password"  register={register} registerName="password" validation={ {validate : (value:string) => { return value.length != 0 || "Enter your password " } } } />
            
            <Button name={isSubmitting ?"is Submitting ":  "Welcome Back !" } type="submit" disabled={isSubmitting} />
            {errors.root && <span className="text-red-500"> { errors.root.message} </span>}

    </form>)
}

interface LoginProps {
    setOption: React.Dispatch<React.SetStateAction<'Login' | 'SignUp'>>;
  }



  const Login: React.FC<LoginProps> = ({ setOption }) => {
    
    const handleSignUpClick = () => {
        setOption('SignUp');
      }; 


    return (
        <div className="w-[50%] min-w-96  max-w-3xl h-[50%] rounded-md flex  bg-[#000000]" > 

            
            <div className=" mt-5 w-full flex flex-col items-center  pl-5 pt-10 ">
                
                <div className="flex flex-col h-[20%]  justify-around  w-[90%] ">
                    <h1 className="text-3xl text-[#ffffff] " >Welcome back ! </h1> 
                    <h1 className="text-3xl text-[#ffffff]"  > Login to continue your journey </h1>
                    <p className=" mt-5 text-sm text-gray-500 text-[#1B1212] text-opacity-75 " > You don't have an account account ?
                    <span   className=" cursor-pointer  text-sm text-[#ffffff] " onClick={handleSignUpClick}> Sign up </span>
                    </p>
                    
                </div>
                
                <LoginForm/>
            </div>
        </div>
    );
}

export default Login;


