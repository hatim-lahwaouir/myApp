
import { useForm, SubmitHandler } from "react-hook-form"
import {  SignUpAction } from "../api/auth";

type Inputs = {
    email: string
    username: string
    password: string
  }




const stopPropagation = (event:any) => {
    event.stopPropagation(); 
  };



const EmailValidation = (value:string) => {
    value = value.trim()
    if (value.length == 0){
        return "This field is required.";
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!regex.test(value)){
        return "Enter a valid email address."
    }
    return true;
}


const UsernameValidation = (value:string) => {
    value = value.trim()

    const regex = /^[a-zA-Z0-9._]+$/;
    
    if (value.length == 0){
        return "This field is required.";
    }

    if( ! regex.test(value)){
        return "Usernames can only use letters, numbers, underscores and periods."
    }
    if (value.length < 3 || value.length > 30){
        return "Usernames maximum length is 30 and minimum length is 3.";
    }
    return true;
}


const passwordValidation = (value:string) =>{
    value = value.trim()

    if (value.length < 6){
        return "Password must have at least 6 characters."
    }
    return true;
}




const Form = () =>{
    const {
        register,
        handleSubmit,
        clearErrors,
        setError,
        formState: { errors },
      } = useForm<Inputs>({mode: "onBlur"})

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const result = await SignUpAction(data);
       
         if (result?.ok){
           console.log(result)
            
         }
         else{
            const errors:any = result?.info;
            Object.keys(errors).forEach(key => {
                if (key == "email" || key == "username" || key == "password")
                setError(key, {
                    message: errors[key][errors[key].length - 1], 
                })

              })

         }

       }


      return (

        <form className="w-[100%] mt-10 flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email", {validate: EmailValidation})   } placeholder="Your email" className=" w-[50%]  bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow "  onClick={ () => clearErrors("email")}/>
        {errors.email && <span className="text-xs text-red-500 mt-1 " >{errors.email.message}</span>}

        <input  {...register("username", {validate: UsernameValidation})} placeholder="Your username" className=" w-[50%] mt-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow " onClick={ () => clearErrors("username")} />
        {errors.username  && <span className="text-xs text-red-500 mt-1 " >{errors.username.message}</span>}
        <input type="password" {...register("password", {validate: passwordValidation})} placeholder="Password" className=" w-[50%] mt-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow " onClick={ () => clearErrors("password")} />
        {errors.password  && <span className="text-xs text-red-500 mt-1 " >{errors.password.message}</span>}

        <span className="text-xs mt-3 w-[50%] flex justify-end text-blue-500 cursor-pointer ">Forget password ? </span>
        <button className="border-2 w-[55%] h-[4em]   mt-8  bg-black text-white text-xs  rounded-3xl cursor-pointer flex justify-center items-center" > Login  </button>
        {errors.root  && <span className="text-xs text-red-500 mt-1 " >{errors.root.message}</span>}

        </form>
      )

}

interface SignUpProps{
    setOption:any,
  }

  const SignUp:React.FC <SignUpProps> = ({setOption}) =>{


    return (
    <div className="w-[30%] h-[40em] flex flex-col bg-stone-50 relative rounded-2xl" onClick={stopPropagation}>
        
        <h1  className="w-[100%] pl-5 pt-5 text-1xl font-bold  "> MILOKI GAME. </h1>
        <div className="w-[100%] mt-10 flex flex-col justify-center items-center">
            <h1  className="  text-6xl font-bold   "> Yo ! </h1>
            <p className="font-light text-sm pt-3"> Welcom to Miloki game ! </p>
        </div>

        <div className="w-[100%] mt-10 flex flex-col justify-center items-center">
        <button className=" border-2 w-[50%] h-9 rounded-xl font-light text-sm " >  Sign up in with google </button>
        </div>
        

        <Form/>
        <span className="text-xs mt-10 w-[100%] flex justify-center ">Already has an account  ! <span className="text-blue-500 pl-1 cursor-pointer " onClick={()=> setOption("login")} > Login ?</span>  </span>

    </div>
    )


}



export default SignUp;
