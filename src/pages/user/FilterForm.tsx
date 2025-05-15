import { FormEvent } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

interface Props {
  onSubmit: (e: FormEvent) => void;
}

export const FilterForm: React.FC<Props> = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    <label>Property</label>
    <InputText placeholder="Property" name="key" />
    <label>Value</label>
    <InputText placeholder="Value" name="value" />
    <Button label="Filter" />
  </form>
);
