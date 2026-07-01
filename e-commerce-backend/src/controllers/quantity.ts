import { type Request, type Response } from "express";
import { addQuantity, reduceQuantity, removeItem } from "../model/query";
import pool from "../model/model";

/**
 * Handles handle add quantity
 */
export const HandleAddQuantity = async (req: Request, res: Response) => {
  const { itemId, userId } = req.body;
  try {
    const result = await pool.query(addQuantity, [itemId, userId]);
    const quantity = result.rows[0].quantity
    return res.json({itemId, quantity});
  } catch (e) {
    console.log(e)
    return res.status(500).json({message: "Failed"});
  }
};


/**
 * Handles handle reduce quantity
 */
export const HandleReduceQuantity = async (req: Request, res: Response) => {
  const { itemId, userId } = req.body;
  try {
    const result = await pool.query(reduceQuantity, [itemId, userId]);
    if (result.rows[0]?.quantity > 1) {
      await pool.query(removeItem,[itemId,userId]);
    }
    return res.json(result.rows[0]);
  } catch (e) {
    console.log(e)
    return res.status(500).json({message: "Failed"});
  }
};
