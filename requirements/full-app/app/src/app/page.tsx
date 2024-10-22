"use client"
import { useState } from 'react';
import Login from './component/Login';
import SignUp from './component/SignUp';

export default function Home() {
  const [option, setOption] = useState('Login');

  return (
    <div >
      {option === 'Login' ? <Login /> : <SignUp />}
    </div>
  );
}