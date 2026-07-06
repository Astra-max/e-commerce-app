import { CartItem } from "../model/cart.model";
import { type Request, type Response } from "express";
import pool from "../config/dbConnect";
import {
  allItems,
  deleteCartItem,
  getSingleItem,
} from "../query/query";
import { addItemQuery } from "../query/cart.query";
import { getAllitemsService } from "../service/cart.services";

// return all items in the cart table
export const HandleGetAllCart = async (req: Request, res: Response) => {
  const { isError, message, data, statusCode } = await getAllitemsService(req)

  if (isError)
    return res.status(statusCode).json({message})
  return res.status(200).json({data})
  
};


// get single item from cart
export const HandleGetCartById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "item id required" });
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

/**
 * Handles handle add item
 */
export const HandleAddItem = async (req: Request, res: Response) => {
  const {
    userId,
    productId,
    quantity,
    productName,
    productDescription,
    productCategory,
    productPrice,
    productImage,
  }: CartItem = req.body;

  if (
    !productId ||
    !productName ||
    !productDescription ||
    !productCategory ||
    !quantity ||
    !userId ||
    !productImage ||
    !productPrice
  ) {
    console.log("Invalid body:", req.body);
    return res.status(400).json({ message: "Missing product details" });
  }

  try {
    const itemExist = await pool.query(getSingleItem, [productId, userId]);

    if (itemExist.rows.length > 0) {
      return res.status(409).json({
        message: "Item already exists. Increase quantity instead.",
      });
    }

    const inserted = await pool.query(addItemQuery, [
      userId,
      productId,
      productName,
      productDescription,
      productCategory,
      quantity,
      productPrice,
      productImage,
    ]);

    console.log(inserted.rows[0]);

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

/**
 * Handles handle remove item
 */
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
