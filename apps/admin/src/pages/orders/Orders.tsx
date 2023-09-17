import "./order.scss";
import { TOrder } from "../../types/order";
import Table from "../../components/Lists/Table";

import LoadingSkeleton from "../../components/Loading/skeleton/LoadingSkeleton";
import { useGetOrdersQuery } from "../../services/orderApi";

const Orders = () => {
  let { data, isLoading } = useGetOrdersQuery();

  let headings: (keyof TOrder)[] = [
    "orderId",
    "orderStatus",
    "createdAt",
    "ownerName",
  ];

  if (data && data.length > 0) {
    data = convert_Each_Item_CreatedAt_IntoDate(data);
  }

  return (
    <div className="users">
      <div className="info">
        <h1>Orders ({data ? `${data.length}` : 0})</h1>
      </div>
      {isLoading && <LoadingSkeleton />}
      {data && <Table title="Orders" headings={headings} content={data} />}
    </div>
  );
};

export default Orders;

function convert_Each_Item_CreatedAt_IntoDate(data: TOrder[]): TOrder[] {
  return data?.map((order) => {
    return {
      ...order,
      createdAt: new Date(order.createdAt).toLocaleDateString("en-US"),
    };
  });
}
