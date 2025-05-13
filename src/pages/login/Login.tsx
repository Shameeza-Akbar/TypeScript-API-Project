import { handleLogin } from "../../services/UserServices"
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FormEvent } from "react";

export const Login =()=>{

    const handleSubmit=async (event:FormEvent)=>{
        event.preventDefault();
        const fd = new FormData(event.target as HTMLFormElement);
        const name= fd.get("name");
        const pass= fd.get("pass");
        await handleLogin(name,pass);
      }
    return <>
    <form onSubmit={handleSubmit}>
        <label>Name</label>
        <InputText name='name'></InputText><br/>
        <label>Password</label>
        <InputText name='pass'></InputText><br/>
        <Button>LOG IN</Button><br/>
    </form>
    </>
}