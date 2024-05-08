import {Router} from "express"
import {mockingProducts} from "../controller/mockingController.js"

const router = Router()

router.get("/mockingproducts", mockingProducts)

export default router