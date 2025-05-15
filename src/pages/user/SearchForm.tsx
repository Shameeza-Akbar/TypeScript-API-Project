import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { FormEvent } from "react";

interface Props {
    handleSubmit: (e:FormEvent)=>void
}
export const SearchForm: React.FC<Props> = ({handleSubmit})=>{
    return <><h3>Search User </h3>
              <form onSubmit={handleSubmit}>
              <label>First name </label>
              <InputText placeholder='Write First name' name='name'/>
              <Button label='Search'/><br/>
              </form></>
};