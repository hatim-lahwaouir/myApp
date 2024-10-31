
import { useForm, SubmitHandler } from "react-hook-form"
import {  LoginAction } from "../api/auth";

type Inputs = {
    email: string
    password: string
  }




const stopPropagation = (event:any) => {
    event.stopPropagation(); 
  };




const Form = () =>{
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
      } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
     const result = await LoginAction(data);
    
      if (result?.ok){
        localStorage.setItem("access", result?.data?.tokens?.access);
        localStorage.setItem("refresh", result?.data?.tokens?.refresh);
        localStorage.setItem('userInfo', JSON.stringify(result?.data?.userInfo));
      }
      else{
        setError("root", {
          "message" : result?.msg,
        })
      }

    }


      return (

        <form className="w-[100%] mt-10 flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} placeholder="Your email" className=" w-[50%] bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
        <input type="password" {...register("password")} placeholder="Password" className=" w-[50%] bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow mt-5" />
        {errors.root  && <span className="text-xs text-red-500 mt-1 " >{errors.root.message}</span>}
        <span className="text-xs mt-3 w-[50%] flex justify-end text-blue-500 ">Forget password ? </span>
        <button className="border-2 w-[55%] h-[4em]   mt-8  bg-black text-white text-xs  rounded-3xl cursor-pointer flex justify-center items-center" > Login  </button>

        </form>
      )

}

interface LoginProps{
  setOption:any,
}
// const Popup: React.FC<PopupProps> = ({ close, trigger, children }) => {

const Login:React.FC <LoginProps> = ({setOption}) =>{


    return (
    <div className="w-[30%] h-[40em] flex flex-col bg-stone-50 relative rounded-2xl" onClick={stopPropagation}>
        
        <h1  className="w-[100%] pl-5 pt-5 text-1xl font-bold  "> MILOKI GAME. </h1>
        <div className="w-[100%] mt-10 flex flex-col justify-center items-center">
            <h1  className="  text-6xl font-bold   "> Hello! </h1>
            <p className="font-light text-sm pt-3"> Welcom to Miloki game ! </p>
        </div>

        <div className="w-[100%] mt-10 flex flex-col justify-center items-center">
        <button className=" border-2 w-[50%] h-9 rounded-xl font-light text-sm " >  Log in with google </button>
        </div>
        
        
        <Form/>

        <span className="text-xs mt-10 w-[100%] flex justify-center ">Don't have an account <span className="text-blue-500 pl-1 cursor-pointer " onClick={() => setOption("signUp")}> Sign up ?</span>  </span>



    </div>
    )


}



export default Login;