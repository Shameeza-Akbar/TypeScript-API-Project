import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { User } from './types';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { useEffect, useState,FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthenticatedUser } from '../../services/UserServices';
import { Login } from '../login/Login';


export const Home=()=>{
    const [visible, setVisible] = useState(false);
     const [user, setUser] = useState<User | null>(null);
     const navigate = useNavigate();
  const authUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const user = await getAuthenticatedUser(token);
    if (!user) return <Login/>;
  };
     useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('https://dummyjson.com/users/1');
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };
    authUsers();
    fetchUser();
  }, []);

    const handleUpdate = () => {
      setVisible(true);
    };
    
       const handleUpdateSubmit = (event: FormEvent) => {
  event.preventDefault();
  const fd = new FormData(event.target as HTMLFormElement);
  const updatedUser = {
    id: 1,
    email: fd.get("email")as string,
    username: fd.get("username")as string,
    firstName: fd.get("fname")as string,
    lastName: fd.get("lname")as string,
    gender: fd.get("gender")as string,
    age: Number(fd.get("age")),
    phone: fd.get("phone")as string,
  };
      // Update the users state with the new user data
      setUser(updatedUser);
      setVisible(false)
     
};
    
    return <>
    <Button label="Update Profile" icon="pi pi-pencil" onClick={handleUpdate}/><br/>
    <Dialog header="Update Profile" visible={visible} onHide={() => setVisible(false)}>
            {user?
            <form onSubmit={handleUpdateSubmit}>

          <label>Email</label>
          <InputText name="email" defaultValue={user.email} />
          <br />
          <label>Username</label>
          <InputText name="username" defaultValue={user.username} />
          <br />
          <label>First Name</label>
          <InputText name="fname" defaultValue={user.firstName} />
          <br />
          <label>Last Name</label>
          <InputText name="lname" defaultValue={user.lastName} />
          <br />
          <label>Gender</label>
          <InputText name="gender" defaultValue={user.gender} />
          <br />
          <label>Age</label>
          <InputNumber name="age" defaultValue={user.age} />
          <br />
          <label>Phone</label>
          <InputNumber name="phone" defaultValue={user.phone} />
          <br />
          <Button type="submit" label="Update User" />
        </form>:<h1>LogIn Again</h1>}
            
        </Dialog>
    <Button label="Show All Users" onClick={()=>{navigate('/users')}}/>
    </>
}