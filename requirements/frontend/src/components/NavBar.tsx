import { useState } from "react"
import Popup from "./Popup"
import Login from "./Login"
import SignUp from "./SingUp"


const LadingPageSection = () => {

    return (<div className="w-[15%]  bg-white text-lg font-semibold flex justify-center items-center cursor-pointer"> 
                Miloki game
            </div>
    )


}

const PagesSection  = () =>{
    return (
    <div className="w-[35%] bg-white text-gray-500 text-base flex  justify-around items-center " > 

            <h1 className="cursor-pointer "> About Me </h1>
            <h1 className="cursor-pointer "> About the game </h1>
            <h1 className="cursor-pointer "> Play </h1>
    </div>)
}

const RegisterSection = () =>{
    const [option, setoption] = useState('');

    
    return (<div className="w-[15%]  bg-white flex justify-around items-center  "> 
    
            <button className="border-2 w-32 h-9  border-neutral-300 rounded-lg cursor-pointer" onClick={() => setoption("login")}> Login  </button>
            <button className="  w-32 h-9  bg-black text-white rounded-md cursor-pointer" onClick={() => setoption("signUp")}> Get started  </button>
            
            <Popup trigger={option.length != 0} close={() => setoption('')}>
                 {option === 'login' && <Login />}
                 {option === 'signUp' && <SignUp />}         
            </Popup>
    
    </div>)

}



const NavBar = () =>{



    return (<div className="flex w-full h-[5em]  justify-around items-center ">
    
        <LadingPageSection/>
        <PagesSection/>
        <RegisterSection/>
    </div>
    
)




}


export default NavBar;