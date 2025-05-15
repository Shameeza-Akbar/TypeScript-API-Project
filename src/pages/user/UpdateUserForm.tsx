import { FormEvent } from "react";
import { User } from "../home/types";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";

interface Props {
  user: User;
  gender: string;
  setGender: (gender: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export const UpdateUserForm: React.FC<Props> = ({ user, gender, setGender, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <h3>Update User</h3>
    <InputText name="email" defaultValue={user.email} /><br />
    <InputText name="username" defaultValue={user.username} /><br />
    <InputText name="fname" defaultValue={user.firstName} /><br />
    <InputText name="lname" defaultValue={user.lastName} /><br />
    <div className="flex align-items-center gap-3">
      <RadioButton
        inputId="maleUpdate"
        name="gender"
        value="male"
        onChange={(e) => setGender(e.value)}
        checked={gender === "male"}
      />
      <label htmlFor="maleUpdate" className="ml-2">Male</label>

      <RadioButton
        inputId="femaleUpdate"
        name="gender"
        value="female"
        onChange={(e) => setGender(e.value)}
        checked={gender === "female"}
      />
      <label htmlFor="femaleUpdate" className="ml-2">Female</label>
    </div><br />
    <Button type="submit" label="Update User" />
  </form>
);
