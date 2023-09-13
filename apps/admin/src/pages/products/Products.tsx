import Table from "../../components/Lists/Table";

import AddModal from "../../components/modal/AddModal";
import { useGetProductsQuery } from "../../services/productAoSlice";
import "./products.scss";
import { useState } from "react";

const Products = () => {
  const { data, error, isLoading } = useGetProductsQuery();
  console.log(data);
  
  const [open, setOpen] = useState<boolean>(false);
  let headings = ["name", "stock", "price", "seller"];

  return (
    <div className="products">
      <div className="info">
        <h1>Productss</h1>
        <button onClick={() => setOpen(true)}>Add User</button>
      </div>
   
      {
        isLoading && <><h1>Loading....</h1></>
      }
         {
        data &&  <Table title="Products" headings={headings} content={data} />
      }
     
      {open && (
        <AddModal slug="Products" columns={[1, 2, 3, 4]} setOpen={setOpen} />
      )}
    </div>
  );
};

export default Products;
