import express from "express";
import { HandleLogin, HandleSignUP } from "../controllers/auth.controllers";
import {
  HandleAddItem,
  HandleGetAllCart,
  HandleRemoveItem,
} from "../controllers/cart.controllers";
import { HandleAddTotal, HandleGetAmount } from "../controllers/amount.controllers";
import {
  HandleAddQuantity,
  HandleReduceQuantity,
} from "../controllers/quantity.controllers";
import { getAllUsersController, getUserByIdController } from "../controllers/users.controllers";
import { authRateLimiter } from "../middleware/rate.limit.middleware";
import { authMiddleware } from "../middleware/auth.middleware";

export const router = express.Router();

//auth routes
router.post("/auth/login", authRateLimiter, HandleLogin);
router.post("/auth/register", authRateLimiter, HandleSignUP);

// users routes
router.get("/users", authMiddleware, getAllUsersController);
router.get("/users/:userId", authMiddleware, getUserByIdController);

//products route

//cart routes
router.post("/carts", authMiddleware, HandleAddItem);
router.get("/carts/", authMiddleware, HandleGetAllCart);
router.delete("/carts/:productId", authMiddleware, HandleRemoveItem);

// quntity routes
router.put("/quantity/add", authMiddleware, HandleAddQuantity);
router.put("/quantity/reduce", authMiddleware, HandleReduceQuantity);
router.get("/total/:userId", authMiddleware, HandleGetAmount);
router.put("/total/:productId", authMiddleware, HandleAddTotal);
