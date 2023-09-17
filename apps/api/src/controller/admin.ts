import { NextFunction, Request, Response } from "express";
import { tryCatchWrapper } from "../middleware/tryCatchWrapper";
import { product } from "../model/product";
import { Images, createProductBody, deleteProductBody } from "common";
import { CustomError } from "../middleware/custumErrorClass";
import mongoose, { ObjectId } from "mongoose";
import getdatauri from "../middleware/dataUri";
import cloudinary, { UploadApiResponse } from "cloudinary";
import { userModel } from "../model/user";
import { orderModel } from "../model/order";
import { ITop3Products, StatDocument, statsModel } from "../model/stats";
import { getTop3ProductsSold } from "../dbQueries/queries";
import { stat } from "fs";

// User controller ..................//

//////////////////////////////////////////

type TUser = {
  _id: ObjectId;
  name: string;
  totalOrders: number;
  amountSpent: number;
  role: string;
};

export const getAllUsers = tryCatchWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("aaya");
    const usersWithOrderStats: TUser[] = await userModel.aggregate([
      {
        $lookup: {
          from: "orders", // Name of your orders collection
          localField: "_id",
          foreignField: "userId",
          as: "orders",
        },
      },
      {
        $project: {
          _id: 1,
          email:1,
          name: 1,
          role: 1,
          totalOrders: { $size: "$orders.orderItems" },
          amountSpent: { $sum: "$orders.paymentInfo.amountPaid" },
        },
      },
    ]);
    res.json(usersWithOrderStats);
  }
);

export const editUserInfo = tryCatchWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, role, _id: id } = req.body;
    if (!name && !role && !id) {
      return next(new CustomError("Please Provide which field to Delete", 400));
    }
    const updateUser: { name?: string; role?: string } = {};

    if (name !== undefined || null) {
      updateUser.name = name;
    }
    if (role !== undefined || null) {
      updateUser.role = role;
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, updateUser, {
      new: true,
    });

    res.json({ user: updatedUser });
  }
);

// Product controller ..................//

//////////////////////////////////////////

type TProduct = {
  _id: ObjectId;
  name: string;
  stock: number;
  price: number;
  seller: string;
  category: string;
};

export const getAllProductsForAdmin = tryCatchWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const products: TProduct[] = await product.find(
      {},
      "name seller stock price category"
    );

    if (products) {
      res.json(products);
    } else {
      res.json({ message: "No Products Found" });
    }
  }
);
export const createproduct = tryCatchWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    
    console.log(req.body.price) 
    console.log(req.body?.stock + ' stock')
    req.body.price = parseInt(req.body?.price);
    req.body.stock = parseInt(req.body?.stock);

    const isValid = createProductBody.safeParse(req.body);
    console.log("success hone jra")
    if (!isValid.success) {
      return next(
        new CustomError(isValid.error.toString(), 400)
      );
    }
    console.log('succes ho gay test')
    const productData = req.body;

    const fileUris = [];
console.log(req.files + " ye files")
    for (let file of req.files as Express.Multer.File[]) {
      fileUris.push(getdatauri(file));
    }

    let uploadedImages: Images[] = [];

    for (let uri of fileUris) {
      const myCloudImage: UploadApiResponse =
        await cloudinary.v2.uploader.upload(uri.content!);
      uploadedImages.unshift({
        url: myCloudImage.secure_url,
        public_id: myCloudImage.public_id,
      });
    }

    const productToBeCreate = { ...productData, images: uploadedImages };

    const createdProduct = await product.create(productToBeCreate);
    console.log(createdProduct + "   product create ho gaya");
    res.status(200).json({ createdProduct });
  }
);
export const editProductInfo = tryCatchWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, stock, _id } = req.body;
    if (!name && !stock && !_id) {
      return next(new CustomError("Please Provide which field to Delete", 400));
    }
    const updateProduct: { name?: string; stock?: number } = {};

    if (name !== undefined || null) {
      updateProduct.name = name;
    }
    if (stock !== undefined || null) {
      updateProduct.stock = parseInt(stock);
    }

    const updatedProduct = await product.findByIdAndUpdate(
      _id,
      updateProduct,
      {
        new: true,
      }
    );

    res.json({ product: updatedProduct });
  }
);
export const deleteProducts = tryCatchWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body?.deleteProducts)
      return next(
        new CustomError("Please Provide Which Product You Want to Delete", 400)
      );
    const objectIds = req.body?.deleteProducts.map(
      (product: string) => new mongoose.Types.ObjectId(product)
    );
    console.log(objectIds);
    const isValid = deleteProductBody.safeParse(objectIds);

    if (!isValid.success)
      return next(new CustomError(isValid.error.errors[0].message, 400));

    const deleted = await product.deleteMany({ _id: { $in: objectIds } });

    res.status(201).json({ message: "Products Deleted" });
  }
);

// Order controller ..................//

//////////////////////////////////////////

type TOrder = {
  _id: ObjectId;
  orderId?: string;
  orderStatus: string;
  createdAt: Date;
  ownerName: string;
};

export const getAllOrdersAdmin = tryCatchWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders: TOrder[] = await orderModel.aggregate([
      {
        $lookup: {
          from: "users", // The name of the "user" collection
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user", // Unwind the array created by $lookup (since it's a one-to-one relationship)
      },
      {
        $project: {
          orderId: 1,
          orderStatus: 1,
          createdAt: 1,
          ownerName: "$user.name", // Assuming the user's name field in the "user" collection is called "name"
        },
      },
    ]);

    res.json(orders);
  }
);

// get Stats /////////////////////////////
//////////////////////////////////////////

async function sendAndGiveMeStats(
  res: Response
): Promise<Pick<StatDocument, "orderStats" | "top3Products" | "userStats">> {
  let top3Products = await getTop3ProductsSold();
  console.log(top3Products);
  let userStats = {
    totalUsers: await userModel.countDocuments(),
    increaseInUsers: "100%",
  };
  let orderStats = {
    totalOrders: await orderModel.countDocuments(),
    increaseInOrders: "100%",
  };

  return {
    top3Products: top3Products.map((item): ITop3Products => {
      return {
        product: item._id,
        totalSold: item.totalSold,
      };
    }),
    userStats,
    orderStats,
  };
}

export const getStats = tryCatchWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    let count = await statsModel.countDocuments();

    if (count === 0) {
      let createStats = await sendAndGiveMeStats(res);
      await statsModel.create(createStats);
    }

    let stats = await statsModel
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .populate("top3Products.product");
 
   return res.json(stats[0]);
  }
);
