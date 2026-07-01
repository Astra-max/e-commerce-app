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

router.post("/v1/auth/login", HandleLogin);
router.post("/v1/auth/sign-up", HandleSignUP);
router.post("/v1/cart", HandleAddItem);
router.delete("/v1/cart/:userId/:productId", HandleRemoveItem);
router.put("/v1/quantity/add",HandleAddQuantity);
router.put("/v1/quantity/reduce", HandleReduceQuantity);
router.get("/v1/cart/:userId", HandleGetCart);
router.get("/v1/total/:userId", HandleGetAmount);
router.put("/v1/total/:productId", HandleAddTotal);
