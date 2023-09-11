import { useState } from "react";
import "./users.scss";
import AddModal from "../../components/modal/AddModal";
import Table from "../../components/Lists/Table";
import { dummyUsers } from "../../data";
const Users = () => {
  const [open, setOpen] = useState<boolean>(false);

  let headings = [
    "name",
    "username",
    "productsBought",
    "amountSpent",
    "role",
  ];
  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add User</button>
      </div>
      <Table title="User" headings={headings} content={dummyUsers} />
      {open && (
        <AddModal slug="user" columns={[1, 2, 3, 4]} setOpen={setOpen} />
      )}
    </div>
  );
};

export default Users;
