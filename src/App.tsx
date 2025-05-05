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

function App() {
  return (
    <div>
      <DataTable tableStyle={{minWidth: "50rem"}} selectionMode="single" >
        <Column field="id" header="ID"></Column>
        <Column field="username" header="Username"></Column>
        <Column field="email" header="E-mail"></Column>
        <Column field="firstName" header="First Name"></Column>
        <Column field="lastName" header="Last Name"></Column>
        <Column field="age" header="Age"></Column>
        <Column field="gender" header="Gender"></Column>
        <Column field="phone" header="Phone Number"></Column>
        <Column header="Delete" body={(rowData) => (
            <Button 
                   icon="pi pi-trash" 
                   className="p-button-danger" 
                   />
              )}/>
        <Column header="Update" body={(rowData) => (
              <Button label="Update" icon="pi pi-pencil"  />
              )}/>
        </DataTable>
    </div>
  );
}

export default App;
