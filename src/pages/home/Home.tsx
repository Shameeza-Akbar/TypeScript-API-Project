import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { User } from './types';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { useEffect, useState,FormEvent } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { useNavigate } from 'react-router-dom';


export const Home=()=>{
    const [visible, setVisible] = useState(false);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));  
    const [user, setUser] = useState<User | null>(null);
    const [updatedGender, setUpdatedGender] = useState<string>(user?.gender || 'male');
    const navigate = useNavigate();

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

    fetchUser();
  }, [token]);

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
    gender: updatedGender,
    age: Number(fd.get("age")),
    phone: fd.get("phone")as string,
  };
      // Update the users state with the new user data
      setUser(updatedUser);
      setVisible(false)
     
};
 const handleLogout=()=>{
        localStorage.removeItem('token');
        setToken(null)
      }
    
    return <>{token?
    <><Button label="Update Profile" icon="pi pi-pencil" onClick={handleUpdate}/><br/>
    <Button label="LogOut" onClick={handleLogout}/><br/>
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
          <label>Age</label>
          <InputNumber name="age" defaultValue={user.age} />
          <br/>
          <label>Gender</label>
          <div className="flex align-items-center gap-3">
           <RadioButton
             inputId="maleUpdate"
             name="gender"
             value="male"
             onChange={(e) => setUpdatedGender(e.value)}
             checked={updatedGender === 'male'}
            />
            <label htmlFor="maleUpdate" className="ml-2">Male</label>

            <RadioButton
            inputId="femaleUpdate"
            name="gender"
            value="female"
            onChange={(e) => setUpdatedGender(e.value)}
            checked={updatedGender === 'female'}
            />
            <label htmlFor="femaleUpdate" className="ml-2">Female</label>
          </div><br />
          <label>Phone</label>
          <InputNumber name="phone" defaultValue={user.phone} />
          <br />
          <Button type="submit" label="Update User" />
        </form>:<h1>LogIn Again</h1>}
            
        </Dialog>
    <Button label="Show All Users" onClick={()=>{navigate('/users')}}/></>:
          <Button label="Go To LogIn Page" onClick={()=>navigate('/login')}/>
    }
    </>
}