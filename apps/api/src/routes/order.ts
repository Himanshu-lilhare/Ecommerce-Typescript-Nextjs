import express from "express"
import { AuthenticateUser } from "../middleware/Authenticae"
import { Checkout, getOrders, paymentVerification } from "../controller/order"

const orderRouter = express.Router()


orderRouter.route('/order/checkout').post(AuthenticateUser,Checkout)
orderRouter.route('/order/verify').post(AuthenticateUser,paymentVerification)
orderRouter.route('/getOrders').get(AuthenticateUser,getOrders)
export default orderRouter