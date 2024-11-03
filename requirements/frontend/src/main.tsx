import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AutContext } from './authContext.ts'


import Landing from './pages/landing/Landing.tsx'
import About from './pages/About/About.tsx'
import Game from './pages/game/Game.tsx'
import { useState } from 'react'


const router = createBrowserRouter([
{
    path : '/',
    element : <Landing/>,
    errorElement : <div> Not found </div>
},
{ 
    path : '/about',
    element : <About/>,
},
{ 
    path : '/game',
    element : <Game/>,
},

]);


const App = () => {
    const [isAuth, setAuth] = useState<any>(localStorage.getItem("access") == null ? false : true);
  
    return (
    <AutContext.Provider value={{isAuth, setAuth}}>
        <RouterProvider router={router} />
    </AutContext.Provider>
    )


  };


createRoot(document.getElementById('root')!).render(        
    <App/>
)
