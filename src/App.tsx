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

function App() {
  const [users,setUsers]=useState<User[]>([])
  const router = createBrowserRouter ([
    {path:'/',element:<Home user={users[0]}/>},
    {path:'/login',element:<Login/>},
    {path:'/users',element:<UserPage/>}
  ])

  return (
    <>
    <RouterProvider router={router}/>
    <div>
      <Login/>
      <Home user={users[0]}/>
      <UserPage/>
    </div>
    </>
  );
}

export default App;
