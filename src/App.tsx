import React, { useEffect, useState, FormEvent } from 'react';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; // or another theme
import 'primereact/resources/primereact.min.css';                 
import 'primeicons/primeicons.css';                               
import 'primeflex/primeflex.css';

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import logo from './logo.svg';
import './App.css';
import { Login } from './pages/login/Login';
import { Home } from './pages/home/Home';
import { User } from './pages/home/types';
import { UserPage } from './pages/user/User';

function App() {
  const [users,setUsers]=useState<User[]>([])
  const [selectedUsers,setSelectedUsers]=useState<User | null>(null)
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  return (
    <div>
      <Login/>
      <Home user={users[0]}/>
      <UserPage/>
    </div>
  );
}

export default App;
