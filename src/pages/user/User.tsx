import { Button } from "primereact/button"
import { FormEvent, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
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
import { SearchForm } from "./SearchForm";
import { FilterForm } from './FilterForm';
import { AddUserForm } from './AddUserForm';
import { UpdateUserForm } from './UpdateUserForm';
import { UserTable } from './UserTable';

export const UserPage: React.FC=()=>{
     const [newGender, setNewGender] = useState<string>('male');
     const [users, setUsers] = useState<User[]>([]);
     const [showAddUserForm, setShowAddUserForm] = useState(false);
     const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
     const [selectedUser, setSelectedUser] = useState<User | null>(null);
     const [showUpdateForm, setShowUpdateForm] = useState(false);
     const [updatedGender, setUpdatedGender] = useState<string>(selectedUser?.gender || 'male');
     const navigate = useNavigate(); 
    

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
 const handleLogout=()=>{
        localStorage.removeItem('token');
        setToken(null)
      }

    return <>
    {token? <><Button label="LogOut" onClick={handleLogout} />
      <h3>Search User</h3>
      <SearchForm handleSubmit={handleSubmit} />

      <h3>Apply Filter</h3>
      <FilterForm onSubmit={handleFilter} />

      {!showAddUserForm && <Button label="Add User" onClick={() => setShowAddUserForm(true)} />}

      {showAddUserForm && <AddUserForm gender={newGender} setGender={setNewGender} onSubmit={handleAddUser} />}

      {showUpdateForm && selectedUser && (
        <UpdateUserForm user={selectedUser} gender={updatedGender} setGender={setUpdatedGender} onSubmit={handleUpdateSubmit} />
      )}

      <Button label="Show All Users" onClick={fetchUsers} />

      <ConfirmDialog />

      <UserTable
        users={users}
        selectedUser={selectedUser}
        onSelect={handleSelection}
        onDelete={confirmDelete}
        onUpdate={handleUpdate}
      /></>:<Button label="Go To LogIn Page" onClick={()=>navigate('/login')}/>}
      </>
    
}