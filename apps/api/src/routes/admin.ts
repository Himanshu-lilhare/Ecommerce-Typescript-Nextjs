import express from "express"
import { createproduct, deleteProducts, editProductInfo, editUserInfo, getAllOrdersAdmin, getAllProductsForAdmin, getAllUsers } from "../controller/admin"
import { AuthenticateUser } from "../middleware/Authenticae"
import { singleupload } from "../middleware/multer"

const adminRouter = express.Router()


// user Routes /////////////////

adminRouter.route('/getUsers').get(getAllUsers)
adminRouter.route('/editUserInfo').put(editUserInfo)

// products routes /////////////

adminRouter.route('/getAllProducts').get(getAllProductsForAdmin)
adminRouter.route('/createProduct').post(singleupload,createproduct)
adminRouter.route('/editProductInfo').put(editProductInfo)
adminRouter.route('/deleteProducts').delete(AuthenticateUser,deleteProducts)


// order oroutes //////////////

adminRouter.route('/getAllOrders').get(getAllOrdersAdmin)




export default adminRouter