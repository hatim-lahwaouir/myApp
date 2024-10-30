

const stopPropagation = (event:any) => {
    event.stopPropagation(); 
  };


const Login = () =>{


    return (
    <div className="w-[25%] h-[40em] flex flex-col bg-stone-50 relative rounded-2xl" onClick={stopPropagation}>
        
        <h1  className="w-[100%] pl-5 pt-5 text-1xl font-bold  "> Miloki game. </h1>
        <div className="w-[100%] mt-10 flex flex-col justify-center items-center">
            <h1  className="  text-6xl font-bold   "> Hello! </h1>
            <p className="font-light text-sm pt-3"> Welcom to Miloki game ! </p>
        </div>

        <div className="w-[100%] mt-10 flex flex-col justify-center items-center">
        <button className=" border-2 w-[55%] h-9 rounded-xl font-light text-sm " >  Log in with google </button>
        </div>
        

        <div className="w-[100%] mt-10 flex flex-col justify-center items-center">
        <input placeholder="Your email" className=" w-[50%] bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
        <input placeholder="Password" className=" w-[50%] bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow mt-5" />
        <span className="text-xs mt-3 w-[50%] flex justify-end text-blue-500 ">Forget password ? </span>
        <button className="border-2 w-[55%] h-[4em]   mt-8  bg-black text-white text-xs  rounded-3xl cursor-pointer flex justify-center items-center" > Login  </button>

        <span className="text-xs mt-10 w-[100%] flex justify-center ">Don't have an account <span className="text-blue-500 pl-1"> Sign up ?</span>  </span>
        </div>





    </div>
    )


}



export default Login;