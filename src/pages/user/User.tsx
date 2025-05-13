import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { FormEvent } from "react"
export const UserPage=()=>{
    const handleSubmit=(event: FormEvent)=>{
        event.preventDefault();
        const fd = new FormData(event.target as HTMLFormElement);
        const name = fd.get("name")as string
        fetch(`https://dummyjson.com/users/search?q=${name}`)
        .then(res => res.json())
       .then(user=>console.info(user));
      }
    return <>
    <h3>Search User </h3>
          <form onSubmit={handleSubmit}>
          <label>First name </label>
          <InputText placeholder='Write First name' name='name'/>
          <Button label='Search'/><br/>
          </form>
          <h3>Apply Filter</h3>
          <form >
          <label>Property </label>
          <InputText placeholder='Property' name='key'/>
          <label> Value </label>
          <InputText placeholder='value' name='value'/>
          <Button label='Filter'/>
          </form>
    </>
}