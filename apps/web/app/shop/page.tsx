import React from "react";
import { AllProducts, serverLink } from "ui";
import { cookies } from "next/headers";
import axios from "axios";

async function getAllProducts(searchParams: any) {
  let page = searchParams.page || 1;
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

const Shop = async ({ searchParams }: any) => {
  const { products, numberofPaginationButton }: any =
    getAllProducts(searchParams);

  return (
    <main className="pad" style={{ minHeight: "100vh" }}>
      <AllProducts
        key={1234}
        products={products}
        numberofPaginationButton={numberofPaginationButton}
        searchParams={searchParams}
      />
    </main>
  );
};

export default Shop;
