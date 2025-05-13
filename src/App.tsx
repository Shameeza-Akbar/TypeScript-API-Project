import { useState} from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // or another theme
import 'primereact/resources/primereact.min.css';                 
import 'primeicons/primeicons.css';                               
import 'primeflex/primeflex.css';
import './App.css';

import { Login } from './pages/login/Login';
import { Home } from './pages/home/Home';
import { User } from './pages/home/types';
import { UserPage } from './pages/user/User';
import Error from './pages/Error/error';
import RootLayout from './pages/RootLayout';

function App() {
  const [users,setUsers]=useState<User[]>([])
  const router = createBrowserRouter ([
    {path:'/',element:<RootLayout/>,
      errorElement: <Error /> ,
    children:[
      {index: true ,element:<Login/>},
      {path:'users',element:<UserPage/>},
      {path:'home',element:<Home user={users[0]}/>}]
  }    
  ])

  return <RouterProvider router={router}/> 
}

export default App;
