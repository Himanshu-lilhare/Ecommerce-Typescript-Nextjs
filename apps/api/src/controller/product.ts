import { NextFunction, Request, Response } from "express";
import { tryCatchWrapper } from "../middleware/tryCatchWrapper.js";

import { product } from "../model/product";
import { CustomError } from "../middleware/custumErrorClass.js";

// import { CustomErrorHandler } from "../middleware/customerrorHandler.js";
interface productQuryTODb {
  category?: string | "";
  price?: priceQuery | "";
}
interface priceQuery {
  $gte?: number | "" | string;
  $lte?: number | "" | string;
}
export const getAllProducts = tryCatchWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    let responsePerPage = 3;

    let page: any = req.query.page;
    let category: any = req.query.category || "";
    let price: any = req.query.price || "";
    console.log(price, category + " price and category");
    if (!page) {
      page = 1;
    }
    page = parseInt(page as string);
    let query: productQuryTODb = {};

    if (category) {
      query.category = category;
    }
    if (price) {
      let [min, max] = price.split(/-|</).map((number: string): number => {
        return parseInt(number);
      });
      if (!isNaN(min)) {
        query.price = { $gte: min, $lte: max };
      } else {
        query.price = { $gte: max };
      }
    }

  

    let products: any = await product
      .find(query)
      .skip(((page as number) - 1) * 3)
      .limit(responsePerPage);

    let numberOfProducts = (await product.countDocuments(query)) || products.length;

    let numberofPaginationButton = Math.ceil(
      numberOfProducts / responsePerPage
    );

    res.status(200).json({ products, numberofPaginationButton });
  }
);
export const getSingleProduct = tryCatchWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    let products = await product.findById(req.params.id);

    if (!products) return next(new CustomError("Product Doesnt Exist", 400));

    res.status(200).json({ product: products });
  }
);
