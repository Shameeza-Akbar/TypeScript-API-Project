import { Button } from 'primereact/button';
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Update } from './UpdateForm';


export const Home=()=>{
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));  
    const navigate = useNavigate(); 
 const handleLogout=()=>{
        localStorage.removeItem('token');
        setToken(null)
      }
    
    return <>
    {token?<>
          <Button label="LogOut" onClick={handleLogout}/><br/>
          <Update/></>
    :
          <Button label="Go To LogIn Page" onClick={()=>navigate('/login')}/>
    }
    </>
}