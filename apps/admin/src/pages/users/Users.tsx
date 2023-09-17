import "./users.scss";
import Table from "../../components/Lists/Table";
import { useGetUsersQuery } from "../../services/usersApi";

import LoadingSkeleton from "../../components/Loading/skeleton/LoadingSkeleton";

const Users = () => {
  const { data, isLoading } = useGetUsersQuery();

  let headings = ["name", "email", "totalOrders", "amountSpent", "role"];
  return (
    <div className="users">
      <div className="info">
        <h1>Users ({data ? `${data.length}` : 0})</h1>
      </div>
      {isLoading && <LoadingSkeleton />}
      {data && <Table title="Users" headings={headings} content={data} />}
    </div>
  );
};

export default Users;
