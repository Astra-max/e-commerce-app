import { type Request, type Response } from "express";
import { addQuantity, reduceQuantity, removeItem } from "../query/query";
import pool from "../config/dbConnect";

/**
 * Handles handle add quantity
 */
export const HandleAddQuantity = async (req: Request, res: Response) => {
  const itemId = req.body.itemId || req.body.productId || req.body.productid;
  const userId = req.body.userId || (req as any).user?.userId;
  
  if (!itemId || !userId) {
    return res.status(400).json({ message: "missing itemId or userId" });
  }

  try {
    const result = await pool.query(addQuantity, [itemId, userId]);
    const quantity = result.rows[0].quantity
    return res.json({itemId, quantity});
  } catch (e) {
    console.log(e)
    return res.status(500).json({message: "Failed to add item quantity"});
  }
};


/**
 * Handles handle reduce quantity
 */
export const HandleReduceQuantity = async (req: Request, res: Response) => {
  const itemId = req.body.itemId || req.body.productId || req.body.productid;
  const userId = req.body.userId || (req as any).user?.userId;

  if (!itemId || !userId) {
    return res.status(400).json({ message: "missing itemId or userId" });
  }

  try {
    const result = await pool.query(reduceQuantity, [itemId, userId]);
    const quantity = result.rows[0]?.quantity ?? 0;
    if (quantity < 1) {
      await pool.query(removeItem, [itemId, userId]);
    }
    return res.json({ itemId, quantity });
  } catch (e) {
    console.log(e)
    return res.status(500).json({message: "Failed"});
  }
};
