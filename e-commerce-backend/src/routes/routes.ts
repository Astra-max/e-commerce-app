import express from "express";
import { HandleLogin, HandleSignUP } from "../controllers/auth.controller";
import {
  HandleAddItem,
  HandleGetCart,
  HandleRemoveItem,
} from "../controllers/user-cart";
import { HandleAddTotal, HandleGetAmount } from "../controllers/amount";
import {
  HandleAddQuantity,
  HandleReduceQuantity,
} from "../controllers/quantity";
import { getAllUsersController } from "../controllers/users.controllers";
import { authRateLimiter, generalRateLimiter } from "../middleware/rate.limit.middleware";


export const router = express.Router();

//auth routes
router.post("/auth/login", authRateLimiter, HandleLogin);
router.post("/auth/register", authRateLimiter, HandleSignUP);

// users routes
router.get("/users",  getAllUsersController);

//cart routes
router.post("/cart",HandleAddItem);
router.delete("/cart/:userId/:productId",  HandleRemoveItem);
router.put("/quantity/add", HandleAddQuantity);
router.put("/quantity/reduce", HandleReduceQuantity);
router.get("/cart/:userId", HandleGetCart);
router.get("/total/:userId",  HandleGetAmount);
router.put("/total/:productId", HandleAddTotal);
