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
import { authRateLimiter, generalRateLimiter } from "../middleware/rate-limiter";


export const router = express.Router();

//auth routes
router.post("/auth/login", authRateLimiter, HandleLogin);
router.post("/auth/register", authRateLimiter, HandleSignUP);

// users routes
router.get("/users", generalRateLimiter, getAllUsersController);

//cart routes
router.post("/cart", generalRateLimiter, HandleAddItem);
router.delete("/cart/:userId/:productId", generalRateLimiter, HandleRemoveItem);
router.put("/quantity/add", generalRateLimiter, HandleAddQuantity);
router.put("/quantity/reduce", generalRateLimiter, HandleReduceQuantity);
router.get("/cart/:userId", generalRateLimiter, HandleGetCart);
router.get("/total/:userId", generalRateLimiter, HandleGetAmount);
router.put("/total/:productId", generalRateLimiter, HandleAddTotal);
