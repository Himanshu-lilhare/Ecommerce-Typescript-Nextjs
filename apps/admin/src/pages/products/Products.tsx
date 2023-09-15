import Table from "../../components/Lists/Table";
import AddModal from "../../components/modal/AddModal";
import { handleScroll } from "../../helpers/handleScroll";
import { useGetProductsQuery } from "../../services/productsApi";
import "./products.scss";
import { useState } from "react";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  console.log(data);

  const [open, setOpen] = useState<boolean>(false);
  let headings = ["name", "stock", "price", "seller"];

  return (
    <div className="products">
      <div className="info">
        <h1>Productss</h1>
        <button
          onClick={() => {
            handleScroll();
            setOpen(true);
          }}
        >
          Add User
        </button>
      </div>

      {isLoading && (
        <>
          <h1>Loading....</h1>
        </>
      )}
      {data && <Table title="Products" headings={headings} content={data} />}

      {open && (
        <AddModal slug="Products" columns={[1, 2, 3, 4]} setOpen={setOpen} />
      )}
    </div>
  );
};

export default Products;
