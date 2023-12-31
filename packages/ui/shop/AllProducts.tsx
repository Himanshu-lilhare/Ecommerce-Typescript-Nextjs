import Product from "./Product";
import "./shop.css";
import PaginationBar from "./PaginationBar";
import FilterBar from "./FilterBar";

export const AllProducts = ({
  searchParams,
  products,
  numberofPaginationButton,
}: any) => {
  return (
    <div>
      <FilterBar/>
      <main className="products-div">
        {products.length > 0 ? (
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
