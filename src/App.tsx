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

function App() {
  return (
    <div>
      <Login/>
    </div>
  );
}

export default App;
