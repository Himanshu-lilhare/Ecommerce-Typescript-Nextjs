import "./order.scss";
import { TOrder } from "../../types/order";
import Table from "../../components/Lists/Table";
import { useGetOrdersQuery } from "../../services/orderSlice";

const Orders = () => {
  const { data, error, isLoading } = useGetOrdersQuery()

  let headings: (keyof TOrder)[] = [
    "orderId",
    "orderStatus",
    "createdAt",
    "ownerName",
  ];
  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
      </div>
      {isLoading && <h1>Loading....</h1>}
      {data && <Table title="Orders" headings={headings} content={data} />}
    </div>
  );
};

export default Orders;
