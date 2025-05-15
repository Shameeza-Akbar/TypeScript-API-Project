import { User } from "../home/types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

interface Props {
  users: User[];
  selectedUser: User | null;
  onSelect: (e: { data: User }) => void;
  onDelete: (id: string) => void;
  onUpdate: (user: User) => void;
}

export const UserTable: React.FC<Props> = ({
  users,
  selectedUser,
  onSelect,
  onDelete,
  onUpdate,
}) => (
  <DataTable
    value={selectedUser ? [selectedUser] : users}
    tableStyle={{ minWidth: '50rem' }}
    selectionMode="single"
    onRowSelect={onSelect}
  >
    <Column field="id" header="ID" />
    <Column field="username" header="Username" />
    <Column field="email" header="Email" />
    <Column field="firstName" header="First Name" />
    <Column field="lastName" header="Last Name" />
    <Column field="gender" header="Gender" />
    <Column field="bloodGroup" header="BloodGroup" />
    <Column
      header="Delete"
      body={(rowData) => (
        <Button
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => onDelete(rowData.id)}
        />
      )}
    />
    <Column
      header="Update"
      body={(rowData) => (
        <Button
          icon="pi pi-pencil"
          label="Update"
          onClick={() => onUpdate(rowData)}
        />
      )}
    />
  </DataTable>
);
