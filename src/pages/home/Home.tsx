import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Update } from './UpdateForm';
import { User } from './types';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { useState } from 'react';

type HomeProps = {
    user: User ;
  };
export const Home=({user}:HomeProps)=>{
    const [visible, setVisible] = useState(false);

    const handleUpdate = () => {
      setVisible(true);
    };
    
       
    
    return <>
    <Button label="Update Profile" icon="pi pi-pencil" onClick={handleUpdate}/><br/>
    <Dialog header="Update Profile" visible={visible} onHide={() => setVisible(false)}>
            {user&&<Update user={user}/>}
            <form >
          <h3>Update User</h3>
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
        </form>
        </Dialog>
    <Button label="Show All Users" />
    </>
}