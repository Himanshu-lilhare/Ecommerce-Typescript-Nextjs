import { useState } from "react";
import "./users.scss";
import AddModal from "../../components/modal/AddModal";
import Table from "../../components/Lists/Table";
import { useGetUsersQuery } from "../../services/usersSlice";


const Users = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { data,isLoading } = useGetUsersQuery();


  let headings = ["name", "username", "totalOrders", "amountSpent", "role"];
  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add User</button>
      </div>
      {isLoading && <h1>Loading....</h1>}
      {data && <Table title="User" headings={headings} content={data} />}

      {open && (
        <AddModal slug="user" columns={[1, 2, 3, 4]} setOpen={setOpen} />
      )}
    </div>
  );
};

export default Users;
