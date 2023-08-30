import { cookies } from "next/headers";
import { serverLink } from "../ServerLink";
import axios from "axios";
import Product from "./Product";
import "./shop.css";
import PaginationBar from "./PaginationBar";

async function getAllProducts(searchParams:any) {
   
  let page = searchParams.page || 1
  try {
    let { data } = await axios.get(`${serverLink}/getProducts?page=${page}`, {
      headers: {
        Authorization: `${cookies().get("fit_wear_token")?.value}`,
      },
      withCredentials: true,
    });

    return {
      products: data?.products,
      numberofPaginationButton: data.numberofPaginationButton,
    };
  } catch (error: any) {
    console.log(error?.response?.data?.error);
  }
}

export const AllProducts = async ({searchParams}:any) => {

  
  const { products , numberofPaginationButton} :any = await getAllProducts(searchParams);


  return (
    <div>
      <main className="products-div">
        {products?.length > 0 ? (
          products.map((product: any, index: number) => {
            return <Product key={index} product={product} />;
          })
        ) : (
          <>
            <h1>No Products</h1>
          </>
        )}
      </main>
      <PaginationBar numberofButton={numberofPaginationButton} searchParams={searchParams} />
    </div>
  );
};
