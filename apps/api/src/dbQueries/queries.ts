import { orderModel } from "../model/order";

export async function getTop3ProductsSold() {
  let data = await orderModel.aggregate([
    {
      $unwind: "$orderItems", // Unwind the orderItems array
    },
    {
      $group: {
        _id: "$orderItems._id",
        totalSold: { $sum: "$orderItems.qty" }, // Calculate the total quantity sold for each product
      },
    },
    {
      $sort: { totalSold: -1 }, // Sort by totalSold in descending order
    },
    {
      $limit: 3, // Limit the results to the top 3 products
    },
  ]);

  return data;
}
