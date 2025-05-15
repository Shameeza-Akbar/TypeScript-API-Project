import { FormEvent } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";

interface Props {
  gender: string;
  setGender: (gender: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export const AddUserForm: React.FC<Props> = ({ gender, setGender, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <InputText name="email" placeholder="Email" /><br />
    <InputText name="username" placeholder="Username" /><br />
    <InputText name="fname" placeholder="First Name" /><br />
    <InputText name="lname" placeholder="Last Name" /><br />
    <div className="flex align-items-center gap-3">
      <RadioButton
        inputId="male"
        name="gender"
        value="male"
        onChange={(e) => setGender(e.value)}
        checked={gender === "male"}
      />
      <label htmlFor="male" className="ml-2">Male</label>

      <RadioButton
        inputId="female"
        name="gender"
        value="female"
        onChange={(e) => setGender(e.value)}
        checked={gender === "female"}
      />
      <label htmlFor="female" className="ml-2">Female</label>
    </div><br />
    <Button type="submit" label="Add User" />
  </form>
);
