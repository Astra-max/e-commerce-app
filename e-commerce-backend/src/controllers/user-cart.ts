import { Item } from "../../types";
import { type Request, type Response } from "express";
import pool from "../model/model";
import {
  allItems,
  cartQuery,
  deleteCartItem,
  getSingleItem,
  saveItem,
} from "../model/query";

export const HandleGetCart = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) return res.json({ message: "please provide userId" });
  try {
    const getAllItems = await pool.query(allItems, [userId]);
    return res.json(getAllItems.rows);
  } catch (error) {
    console.log(error);
  }
};

export const HandleGetProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "product id required" });
  const productId = parseInt(id);

  try {
    const getSingleProduct = await pool.query(getSingleItem, [productId]);
    if (getSingleProduct.rows.length === 0) {
      return res.status(404).json({ message: "notFound" });
    }
    return res.json(getSingleProduct.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

export const HandleAddItem = async (req: Request, res: Response) => {
  const {
    productid,
    name,
    description,
    category,
    quantity,
    status,
    userId,
    image,
    amount,
  }: Item = req.body;

  console.log(amount);
  if (
    !productid ||
    !name ||
    !description ||
    !category ||
    !quantity ||
    !status ||
    !userId ||
    !image ||
    !amount
  ) {
    console.log("Invalid body:", req.body);
    return res.status(400).json({ message: "Missing product details" });
  }

  try {
    const itemExist = await pool.query(getSingleItem, [productid, userId]);

    if (itemExist.rows.length > 0) {
      return res.status(409).json({
        message: "Item already exists. Increase quantity instead.",
      });
    }

    const inserted = await pool.query(
      `INSERT INTO cart 
        (userid, productid, name, description, category, quantity, price, image, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [
        userId,
        productid,
        name,
        description,
        category,
        quantity,
        amount,
        image,
        status,
      ]
    );

    console.log("Item added successfully!");

    return res.status(201).json(inserted.rows[0]);
  } catch (error: any) {
    console.error("Add item error:", error);
    return res.status(500).json({
      message: "Failed to add product to cart",
      error: error.message,
    });
  }
};

export const HandleRemoveItem = async (req: Request, res: Response) => {
  const { productId, userId } = req.params;

  if (!userId || !productId)
    return res.status(400).json({ message: "missing params" });

  try {
    await pool.query(deleteCartItem, [userId, productId]);
    return res.status(200).json({ message: `removed item` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};
