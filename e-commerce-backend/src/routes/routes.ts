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


export const router = express.Router();

router.post("/auth/login", HandleLogin);
router.post("/auth/sign-up", HandleSignUP);
router.post("/cart", HandleAddItem);
router.delete("/cart/:userId/:productId", HandleRemoveItem);
router.put("/quantity/add",HandleAddQuantity);
router.put("/quantity/reduce", HandleReduceQuantity);
router.get("/cart/:userId", HandleGetCart);
router.get("/total/:userId", HandleGetAmount);
router.put("/total/:productId", HandleAddTotal);
