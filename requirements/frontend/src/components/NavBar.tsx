import { useState } from "react"
import Popup from "./Popup"
import Login from "./Login"
import SignUp from "./SingUp"
import { Link } from "react-router-dom"

const LadingPageSection = () => {

    return (<div className="w-[15%]  bg-white text-lg font-semibold flex justify-center items-center cursor-pointer"> 
                <Link to="/" > Miloki game</Link>
            </div>
    )


}

const PagesSection  = () =>{
    return (
    <div className="w-[35%] bg-white text-gray-500 text-base flex  justify-around items-center " > 

            <h1 className="cursor-pointer "> <Link to="/about" > About Me </Link>  </h1>
            <h1 className="cursor-pointer "> <Link to="/game" > game </Link>  </h1>
            <h1 className="cursor-pointer "> <Link to="/contact" > contact </Link>  </h1>

    </div>)
}

const RegisterSection = () =>{
    const [option, setoption] = useState('');

    
    return (<div className="w-[20%] min-w-64  bg-white flex justify-around items-center  "> 
    
            <button className="border-2 w-32 h-9  border-neutral-300 rounded-lg cursor-pointer" onClick={() => setoption("login")}> Login  </button>
            <button className="  w-32 h-9  bg-black text-white rounded-md cursor-pointer" onClick={() => setoption("signUp")}> Get started  </button>
            
            <Popup trigger={option.length != 0} close={() => setoption('')}>
                 {option === 'login' && <Login setOption={setoption} />}
                 {option === 'signUp' && <SignUp setOption={setoption} />}         
            </Popup>
    
    </div>)

}


const LogoutSection = () =>{

    
    return (<div className="w-[20%] min-w-64  bg-white flex justify-around items-center  "> 
            <button className="  w-32 h-9  bg-black text-white rounded-md cursor-pointer" > Logout </button>
    </div>)

}



const NavBar = () =>{
    const isAuthenticated = localStorage.getItem('access') != null; 


    return (<div className="flex w-full h-[5em]   justify-around items-center ">
    
        <LadingPageSection/>
        <PagesSection/>

        { isAuthenticated || <RegisterSection/>}
        { isAuthenticated && <LogoutSection/>}
    </div>
    
)




}


export default NavBar;