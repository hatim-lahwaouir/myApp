"use client"
import { useState } from 'react';
import Login from './component/Login';
import SignUp from './component/SignUp';
import img from "../../public/img.jpeg";
import Image from "next/image";



function Home() {
  const [option, setOption] = useState('Login');

  return (
    <div  className="w-full  bg-[#0F0F0F] h-screen flex justify-center items-center " >
      {option === 'Login' ? <Login setOption={setOption} /> : <SignUp setOption={setOption} />}
    </div>
);
}



export default Home;