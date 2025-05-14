import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';
import { User, bloodGroupArr, genderArr } from './types';
import { useEffect, useState,FormEvent } from 'react';
import { getUserById } from "../../services/UserServices";


export const Update = ()=>{
    const [visible, setVisible] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [updatedGender, setUpdatedGender] = useState<string>(user?.gender || '');
    const [updatedBloodGroup, setUpdatedBloodGroup] = useState<string>(user?.bloodGroup|| "");
    const navigate = useNavigate();
    const handleUpdate = () => {
      setVisible(true);
    };
    
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const data = await getUserById("1");
            setUser(data);
          } catch (err) {
            console.error('Failed to fetch user:', err);
          }
        };
    
        fetchUser();
      }, []);

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
    bloodGroup: updatedBloodGroup,
  };
      // Update the users state with the new user data
      setUser(updatedUser);
      setVisible(false)
     
};
    return <><Button label="Update Profile" icon="pi pi-pencil" onClick={handleUpdate}/><br/>
    
    <Dialog header="Update Profile" visible={visible} onHide={() => setVisible(false)}>
            {user?
            <form onSubmit={handleUpdateSubmit}>
          
          <label>Username</label>
          <InputText name="username" defaultValue={user.username} />
          <br />
          <label>First Name</label>
          <InputText name="fname" defaultValue={user.firstName} />
          <br />
          <label>Last Name</label>
          <InputText name="lname" defaultValue={user.lastName} />
          <br />
          <label>Email</label>
          <InputText name="email" defaultValue={user.email} />
          <br />
          <label>Gender</label>
          <div>
            {genderArr.map((val)=>(<><RadioButton
            inputId={val}
            name="gender"
            value={val}
            onChange={(e) => setUpdatedGender(e.value)}
            checked={updatedGender === val}
            />
            <label htmlFor={val} className="ml-2">{val}</label><br/></>))}
          </div><br />
          <label>Blood Group</label>
          <div>
            {bloodGroupArr.map((val)=>(<><RadioButton
            inputId={val}
            name="bloodGroup"
            value={val}
            onChange={(e) => setUpdatedBloodGroup(e.value)}
            checked={updatedBloodGroup === val}
            />
            <label htmlFor={val} className="ml-2">{val}</label><br/></>))}
          </div><br />
          <Button type="submit" label="Update User" />
        </form>:<h1>LogIn Again</h1>}
            
        </Dialog>
    <Button label="Show All Users" onClick={()=>{navigate('/users')}}/></>
}