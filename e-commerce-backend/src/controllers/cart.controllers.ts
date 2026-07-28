import { CartItem } from "../model/models";
import { type Request, type Response } from "express";
import pool from "../config/dbConnect";
import {
  getSingleItem,
} from "../query/query";
import { addItemQuery } from "../query/cart.query";
import { deleteSingleitemsService, getAllitemsService, getSingleitemsService } from "../service/cart.services";
import { logger } from "../util/logger";

const mapCartItemToFrontend = (item: any) => {
  if (!item) return item;
  return {
    productid: item.product_id,
    name: item.product_name,
    description: item.product_description,
    category: item.product_category,
    amount: Number(item.product_price),
    image: item.product_image,
    quantity: item.quantity,
    userId: item.user_id,
    status: item.product_status || "cart",
  };
};

// return all items in the cart table
export const HandleGetAllCart = async (req: Request, res: Response) => {
  const { isError, message, data, statusCode } = await getAllitemsService(req)

  if (isError)
    return res.status(statusCode).json({message})
  
  const mappedData = (data || []).map(mapCartItemToFrontend);
  return res.status(200).json(mappedData);
};


// get single item from cart
export const HandleGetCartById = async (req: Request, res: Response) => {
  const { isError, data, message, statusCode} = await getSingleitemsService(req);

  if (isError)
    return res.status(statusCode).json({ message });
  return res.json({ data: mapCartItemToFrontend(data) })
};


//  * Handles handle add item
export const HandleAddToCart = async (req: Request, res: Response) => {
  const userId = req.body.userId || (req as any).user?.userId;
  const productId = req.body.productId || req.body.productid;
  const quantity = req.body.quantity;
  const productName = req.body.productName || req.body.name;
  const productDescription = req.body.productDescription || req.body.description;
  const productCategory = req.body.productCategory || req.body.category;
  const productPrice = req.body.productPrice || req.body.amount;
  const productImage = req.body.productImage || req.body.image;

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

    console.log("Item added successfully!");

    return res.status(201).json(mapCartItemToFrontend(inserted.rows[0]));
  } catch (error: any) {
    console.error("Add item error:", error);
    return res.status(500).json({
      message: "Failed to add product to cart",
      error: error.message,
    });
  }
};


// Handles handle remove item
export const HandleRemoveItemById = async (req: Request, res: Response) => {
  try {
    const { isError, statusCode, message } = await deleteSingleitemsService(req);
     if (isError) {
    logger.warn(`${message}`)
    return res.status(statusCode).json({ message });
  }
  } catch (error) {
    return res.json({message: "server error"})
  }
 
  logger.info("cart item deleted successfully!")
  return res.status(200).json({ message: "item deleted succefully" });
};