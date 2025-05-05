import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Update } from './UpdateForm';
import { User } from './types';
import { useState } from 'react';

type HomeProps = {
    user: User | null;
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
        </Dialog>
    <Button label="Show All Users" />
    </>
}