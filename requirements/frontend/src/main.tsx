import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Landing from './pages/landing/Landing.tsx'
import About from './pages/About/About.tsx'
import Game from './pages/game/Game.tsx'


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

createRoot(document.getElementById('root')!).render(

    <RouterProvider router={router}/>
)
