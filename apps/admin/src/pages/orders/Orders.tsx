import "./order.scss";
import { TOrder } from "../../types/order";
import Table from "../../components/Lists/Table";

import LoadingSkeleton from "../../components/Loading/skeleton/LoadingSkeleton";
import { useGetOrdersQuery } from "../../services/orderApi";

const Orders = () => {
  const { data , isLoading } = useGetOrdersQuery()

  let headings: (keyof TOrder)[] = [
    "orderId",
    "orderStatus",
    "createdAt",
    "ownerName",
  ];
  return (
    <div className="users">
      <div className="info">
        <h1>Orders ({ data ? `${data.length}` : 0  })</h1>
      </div>
      {isLoading && <LoadingSkeleton/>}
      {data && <Table title="Orders" headings={headings} content={data} />}
    </div>
  );
};

export default Orders;
