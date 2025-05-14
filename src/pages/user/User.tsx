import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
export const UserPage=()=>{
     const navigate = useNavigate();

        const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    
    const handleSubmit=(event: FormEvent)=>{
        event.preventDefault();
        const fd = new FormData(event.target as HTMLFormElement);
        const name = fd.get("name")as string
        fetch(`https://dummyjson.com/users/search?q=${name}`)
        .then(res => res.json())
       .then(user=>console.info(user));
      }

      const handleLogout=()=>{
        localStorage.removeItem('token');
        setToken(null)
      }
    return <>
    {token?<><Button label="LogOut" onClick={handleLogout}/><br/>
        <h3>Search User </h3>
          <form onSubmit={handleSubmit}>
          <label>First name </label>
          <InputText placeholder='Write First name' name='name'/>
          <Button label='Search'/><br/>
          </form>
          <h3>Apply Filter</h3>
          <form >
          <label>Property </label>
          <InputText placeholder='Property' name='key'/>
          <label> Value </label>
          <InputText placeholder='value' name='value'/>
          <Button label='Filter'/>
          </form></>:
        <Button label="Go To LogIn Page" onClick={()=>navigate('/login')}/>}
    </>
}