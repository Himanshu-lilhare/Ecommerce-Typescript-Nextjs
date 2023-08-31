import Product from "./Product";
import "./shop.css";
import PaginationBar from "./PaginationBar";

export const AllProducts = ({
  searchParams,
  products,
  numberofPaginationButton,
}: any) => {
  return (
    <div>
      <main className="products-div">
        {products ? (
          products.map((product: any, index: number) => {
            return <Product key={index} product={product} />;
          })
        ) : (
          <>
            <h1>No Products</h1>
          </>
        )}
      </main>
      <PaginationBar
        numberofButton={numberofPaginationButton}
        searchParams={searchParams}
      />
    </div>
  );
};
