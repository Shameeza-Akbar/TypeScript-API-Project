import { InputText } from "primereact/inputtext"
import { User } from "./types"
import { InputNumber } from "primereact/inputnumber"
import { Button } from "primereact/button"
import { FormEvent } from "react"

type UpdateProps = {
    user: User;
  };
export const Update = ({user}:UpdateProps)=>{

    const handleUpdateSubmit = (event:FormEvent) => {
        event.preventDefault();
        const fd = new FormData(event.target as HTMLFormElement);
        const updatedUser = {
          email: fd.get("email"),
          username: fd.get("username"),
          firstName: fd.get("fname"),
          lastName: fd.get("lname"),
          gender: fd.get("gender"),
          age: fd.get("age"),
          phone: fd.get("phone"),
        };
      
        // Make PUT request to update the user on the server
        fetch(`https://dummyjson.com/users/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
        })
          .then((res) => res.json())
      };

      
    return <>
    <form onSubmit={handleUpdateSubmit}>
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
        </form></>
}