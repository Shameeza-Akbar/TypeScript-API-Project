import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // or another theme
import 'primereact/resources/primereact.min.css';                 
import 'primeicons/primeicons.css';                               
import 'primeflex/primeflex.css';
import './App.css';

import { Home } from './pages/home/Home';
import { UserPage } from './pages/user/User';
import Error from './pages/Error/error';
import RootLayout from './pages/RootLayout';
import { Login } from './pages/login/Login';
import { StartPage } from './Start'
function App() {
  const router = createBrowserRouter ([
    {path:'/',element:<RootLayout/>,
      errorElement: <Error /> ,
    children:[
      {index: true ,element:<StartPage/>},
      {path:'users',element:<UserPage/>},
      {path:'login',element:<Login/>},
      {path:'home',element:<Home/>}]
  }    
  ])

  return <RouterProvider router={router}/> 
}

export default App;
