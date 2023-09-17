import React from "react";
import { AllProducts, serverLink } from "ui";
import { cookies } from "next/headers";
import axios from "axios";
import Head from "next/head";
import { Metadata } from "next";
import { giveMetaData } from "../page";


export const metadata: Metadata = giveMetaData('SHOP','This is hop page')
async function getAllProducts(searchParams: any) {
  // let page = searchParams.page || 1;
  let covertThis = {
    page: searchParams.page || 1,
    category: searchParams.category || "",
    price: searchParams.price || "",
  };

  let searchParam = new URLSearchParams();
  for (let key in covertThis) {
    searchParam.set(key, covertThis[key]);
  }

  try {
    let { data } = await axios.get(
      `${serverLink}/getProducts?${searchParam.toString()}`,
      {
        headers: {
          Authorization: `${cookies().get("fit_wear_token")?.value}`,
        },
        withCredentials: true,
      }
    );

    return {
      products: data?.products,
      numberofPaginationButton: data.numberofPaginationButton,
    };
  } catch (error: any) {
    console.log(error?.response?.data?.error);
  }
}

const Shop = async ({ searchParams }: any) => {
  const { products, numberofPaginationButton }: any = await getAllProducts(
    searchParams
  );

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
