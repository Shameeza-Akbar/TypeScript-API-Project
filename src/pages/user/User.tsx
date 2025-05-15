import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { FormEvent, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { RadioButton } from 'primereact/radiobutton';
import { User } from "../home/types";
import { confirmDialog } from 'primereact/confirmdialog';
import { ConfirmDialog } from 'primereact/confirmdialog';
import {
  getAllUsers,
  searchUsers,
  filterUsers,
  getUserById,
  deleteUser,
  addUser,
  updateUser,
} from '../../services/UserServices';

export const UserPage: React.FC=()=>{
     const navigate = useNavigate();
     const [newGender, setNewGender] = useState<string>('male');
     const [users, setUsers] = useState<User[]>([]);
     const [showAddUserForm, setShowAddUserForm] = useState(false);
     const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
     const [selectedUser, setSelectedUser] = useState<User | null>(null);
     const [showUpdateForm, setShowUpdateForm] = useState(false);
     const [updatedGender, setUpdatedGender] = useState<string>(selectedUser?.gender || 'male');
    

       useEffect(() => {
    fetchUsers();
  }, []);
    const fetchUsers = async () => {
    const allUsers = await getAllUsers();
    setUsers(allUsers);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const name = fd.get('name') as string;
    const result = await searchUsers(name);
    setUsers(result);
  };
        const handleUpdate = (user: User) => {
    setSelectedUser(user);
    setShowUpdateForm(true);
  };
      const handleAddUser = async (event: FormEvent) => {
    event.preventDefault();
    const fd = new FormData(event.target as HTMLFormElement);
    const newUser = {
      email: fd.get('email') as string,
      username: fd.get('username') as string,
      firstName: fd.get('fname') as string,
      lastName: fd.get('lname') as string,
     gender: newGender,
      age: Number(fd.get('age')),
      phone: fd.get('phone') as string,
    };
    const createdUser = await addUser(newUser);
    setUsers((prev) => [...prev, createdUser]);
    setShowAddUserForm(false);
  };

  
  const handleDelete = async (id: string) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => `${u.id}` !== `${id}`));
    setSelectedUser(null);
  };
    const handleSelection = async (event: { data: User }) => {
    const user = await getUserById(`${event.data.id}`);
    setSelectedUser(user);
  };
    const handleFilter = async (e: FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const key = fd.get('key') as string;
    const value = fd.get('value') as string;
    const result = await filterUsers(key, value);
    setUsers(result);
  };
    const handleUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    const fd = new FormData(e.target as HTMLFormElement);
    const updated = {
      email: fd.get('email') as string,
      username: fd.get('username') as string,
      firstName: fd.get('fname') as string,
      lastName: fd.get('lname') as string,
      gender: updatedGender,
      age: Number(fd.get('age')),
      phone: fd.get('phone') as string,
    };
    const updatedUser = await updateUser(`${selectedUser.id}`, updated);
    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? updatedUser : u))
    );
    setShowUpdateForm(false);
    setSelectedUser(null);
  };

  const confirmDelete = (id: string) => {
  confirmDialog({
    message: 'Are you sure you want to delete this user?',
    header: 'Delete Confirmation',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Yes',
    rejectLabel: 'No',
    acceptClassName: 'p-button-danger',
    accept: () => handleDelete(id),
    reject: () => {
      console.log('User cancelled deletion.');
    },
  });
};

    return <>
    {token?<><Button label="LogOut" onClick={()=>setToken(null)}/><br/>
        <h3>Search User </h3>
          <form onSubmit={handleSubmit}>
          <label>First name </label>
          <InputText placeholder='Write First name' name='name'/>
          <Button label='Search'/><br/>
          </form>
          <h3>Apply Filter</h3>
          <form onSubmit={handleFilter}>
          <label>Property </label>
          <InputText placeholder='Property' name='key'/>
          <label> Value </label>
          <InputText placeholder='value' name='value'/>
          <Button label='Filter'/>
          </form>
          {!showAddUserForm && (
          <Button label="Add User" onClick={() => setShowAddUserForm(true)} />
      )}
      {showAddUserForm && (
        <form onSubmit={handleAddUser}>
          <InputText name="email" placeholder="Email" /><br />
          <InputText name="username" placeholder="Username" /><br />
          <InputText name="fname" placeholder="First Name" /><br />
          <InputText name="lname" placeholder="Last Name" /><br />
          <div className="flex align-items-center gap-3">
  <RadioButton
    inputId="male"
    name="gender"
    value="male"
    onChange={(e) => setNewGender(e.value)}
    checked={newGender === 'male'}
  />
  <label htmlFor="male" className="ml-2">Male</label>

  <RadioButton
    inputId="female"
    name="gender"
    value="female"
    onChange={(e) => setNewGender(e.value)}
    checked={newGender === 'female'}
  />
  <label htmlFor="female" className="ml-2">Female</label>
</div><br />

          <Button type="submit" label="Add User" />
        </form>
      )}
      {showUpdateForm && selectedUser && (
        <form onSubmit={handleUpdateSubmit}>
          <h3>Update User</h3>
          <InputText name="email" defaultValue={selectedUser.email} /><br />
          <InputText name="username" defaultValue={selectedUser.username} /><br />
          <InputText name="fname" defaultValue={selectedUser.firstName} /><br />
          <InputText name="lname" defaultValue={selectedUser.lastName} /><br />
          <InputText name="gender" defaultValue={selectedUser.gender} /><br />
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
          <Button type="submit" label="Update User" />
        </form>
      )}
      <Button label="Show All Users" onClick={fetchUsers} /> 
{token ? (
      <>
        <ConfirmDialog />
        {/* All your other components */}
      </>
    ) : (
      <Button label="Go To LogIn Page" onClick={() => navigate('/login')} />
    )}
    <DataTable
        value={selectedUser ? [selectedUser] : users}
        tableStyle={{ minWidth: '50rem' }}
        selectionMode="single"
        onRowSelect={handleSelection}
      >
        <Column field="id" header="ID" />
        <Column field="username" header="Username" />
        <Column field="email" header="Email" />
        <Column field="firstName" header="First Name" />
        <Column field="lastName" header="Last Name" />
        <Column field="gender" header="Gender" />
        <Column field="bloodGroup" header="BloodGroup" />
        <Column
          header="Delete"
          body={(rowData) => (
            <Button
              icon="pi pi-trash"
              className="p-button-danger"
              onClick={() => confirmDelete(rowData.id)}
            />
          )}
        />
        <Column
          header="Update"
          body={(rowData) => (
            <Button
              icon="pi pi-pencil"
              label="Update"
              onClick={() => handleUpdate(rowData)}
            />
          )}
        />
      </DataTable></>:
        <Button label="Go To LogIn Page" onClick={()=>navigate('/login')}/>}
    </>
}