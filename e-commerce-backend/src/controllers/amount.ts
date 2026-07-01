import pool from "../model/model";
import { addTotal, getTotal } from "../model/query";
import { type Request, type Response } from "express";

/**
 * Handles handle get amount
 */
export const HandleGetAmount = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ message: "missing userId" });

  try {
    const sumAmount = await pool.query(getTotal, [userId]);
    const { total } = sumAmount.rows[0];
    console.log(total)
    return res.json({ total: total });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Handles handle add total
 */
export const HandleAddTotal = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const { productId } = req.params;
  if (!userId || !productId)
    return res.status(400).json({ message: "missing userid or productid" });
  const totalPrice = await pool.query(addTotal, [productId, userId]);
  console.log(totalPrice);
};
