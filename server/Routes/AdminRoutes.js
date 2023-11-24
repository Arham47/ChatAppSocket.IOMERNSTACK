import express from "express";
import { addBillingAddress, addCompanyDetails, addSubscription, login, signUp, stripeTokenCheck } from "../Controllers/AdminController.js";
const router = express.Router();
router.post("/signup", signUp)
router.post("/signup/addcompanydetail", addCompanyDetails)
router.post("/signup/payment", addBillingAddress)
router.post("/signup/subscription", addSubscription)
router.post("/signup/stripetokencheck", stripeTokenCheck)
router.post("/signin/login", login)




export default router;