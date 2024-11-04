import { useState, useContext } from "react"
import Popup from "./Popup"
import Login from "./Login"
import SignUp from "./SingUp"
import { Link } from "react-router-dom"
import { AutContext } from "../authContext"


interface User{
    username : string | null,
    id : string | null,
    loggedIn : boolean,
    setUser : any,
}


const LadingPageSection = () => {

    return (<div className="w-[15%]  bg-white text-lg font-semibold flex justify-center items-center cursor-pointer"> 
                <Link to="/" > Miloki game</Link>
            </div>
    )


}

const PagesSection  = ({isAuthenticated} :any) =>{

    if (isAuthenticated)
    {
    return (
    <div className="w-[35%] bg-white text-gray-500 text-base flex  justify-around items-center " > 

            <h1 className="cursor-pointer "> <Link to="/about" > About Me </Link>  </h1>
            <h1 className="cursor-pointer "> <Link to="/game" > Play </Link>  </h1>

    </div>)
    }  
    
    return (
        <div className="w-[35%] bg-white text-gray-500 text-base flex  justify-around items-center " > 

                <h1 className="cursor-pointer "> <Link to="/about" > About Me </Link>  </h1>
        </div>
    )
}

const RegisterSection = () =>{
    const [option, setoption] = useState(['']);

    return (<div className="w-[20%] min-w-64  bg-white flex justify-around items-center  "> 
    
            <button className="border-2 w-32 h-9  border-neutral-300 rounded-lg cursor-pointer" onClick={() => setoption(["login"])}> Login  </button>
            <button className="  w-32 h-9  bg-black text-white rounded-md cursor-pointer" onClick={() => setoption(["signUp"])}> Get started  </button>
            
            <Popup trigger={option[0].length != 0} close={() => setoption([''])}>
                 {option[0] === 'login' && <Login setOption={setoption} option={option} />}
                 {option[0] === 'signUp' && <SignUp setOption={setoption} />}
            </Popup>
    
    </div>)

}


const LogoutSection = ({logOut}:any) =>{

    
    const auth = useContext(AutContext);
    return (<div className="w-[20%] min-w-64  bg-white flex justify-around items-center  "> 
            <button className="  w-32 h-9  bg-black text-white rounded-md cursor-pointer" onClick={() => {
                logOut();
                auth?.setAuth(false);
                localStorage.clear();
            }} > Logout </button>
    </div>)

}



const NavBar = () =>{
    const auth = useContext(AutContext);
    const isAuthenticated = localStorage.getItem("access") != null ; 

    return (<div className="flex w-full h-[5em]   justify-around items-center ">
    
        <LadingPageSection/>
        <PagesSection isAuthenticated={isAuthenticated} />

        { isAuthenticated || <RegisterSection/>}
        { isAuthenticated && <LogoutSection logOut={() => auth?.setAuth(false)} />}
    </div>
    )
}


export default NavBar;