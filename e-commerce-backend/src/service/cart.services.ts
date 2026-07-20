import { Request } from "express";
import { deleteAllItemsRepo, deleteSingleItemRepo, getAllItemsRepo, getSingleItemRepo, saveItemRepo } from "../repository/cart.respository"
import { ServiceResponse } from "../model/response";
import { CartItem } from "../model/models";
import isRepositoryError from "../util/repoErr";
import { getUserById } from "../repository/user.repository";


export const addNewItemService = async (req: Request): Promise<ServiceResponse<CartItem>> => {
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

  if (!productId) return {isError: true, message: "productId is missing", statusCode: 400};
  if (!userId) return {isError: true, message: "userId is missing", statusCode: 400};
  if (!quantity) return {isError: true, message: "quantity is missing", statusCode: 400};
  if (!productName) return {isError: true, message: "product name is missing", statusCode: 400};
  if (!productDescription) return {isError: true, message: "product description is missing", statusCode: 400};
  if (!productCategory) return {isError: true, message: "product category is missing", statusCode: 400};
  if (!productPrice) return {isError: true, message: "product price is missing", statusCode: 400};
  if (!productImage) return {isError: true, message: "product image is missing", statusCode: 400};

  const item: CartItem = { userId, productId, quantity, productName, productDescription, productCategory, productPrice, productImage};

  const saved = await saveItemRepo(item);

  if (!saved) return { isError: true, message: "Failed to save item to db", statusCode: 500};
  return { isError: false, message: "item saved successfully", statusCode: 201 };
}


export const getAllitemsService = async (req: Request): Promise<ServiceResponse<CartItem[]>> => {
    const userId = req.body?.userId;

    if (!userId) return { isError: true, message: "Missing userId", statusCode: 400 }

    const data = await getAllItemsRepo();
    return { isError: false, message: "all products", statusCode: 200, data: data }
}

export const getSingleitemsService = async (req: Request): Promise<ServiceResponse<CartItem>> => {
    const productId = req.params?.productId
    const userId = req.body?.userId;

    if (!userId) return { isError: true, message: "Missing userId", statusCode: 400 };
    if (!productId) return { isError: true, message: "missing product id", statusCode: 400 }

    const data = await getSingleItemRepo(productId, userId)

    if (isRepositoryError(data)) {
        return { isError: true, message: "failed to get value", statusCode: 500 }
    }

    return { isError: false, message: "single product", statusCode: 200, data: data };

}

export const updateSingleitemService = async (req: Request) => { }

export const deleteAllitemsService = async (req: Request) => {
    const userId = req.body?.userId;

    if (!userId) return { isError: true, messaage: "missing user id", statusCode: 400};
    const results = await deleteAllItemsRepo();

    if (!results) return { isError: true, message: "failed to clear user cart", statusCode: 500}
    return { isError: false, message: "cleared user cart successfully", statusCode: 200};

 }

export const deleteSingleitemsService = async (req: Request): Promise<ServiceResponse<CartItem>> => {
    const userId = req.body?.userId;
    const itemId = req.params?.itemId;

    if (!userId) return { isError: true, message: "userId is missing", statusCode: 400 };
    if (!itemId) return { isError: true, message: "itemId is missing", statusCode: 400 };

    const userExists = await getUserById(userId);

    if (isRepositoryError(userExists)) {
        return { isError: true, message: `${userExists.message}`, statusCode: 401 };
    }

    const deletedItem = await deleteSingleItemRepo(itemId, userId);

    if (deletedItem == null) {
    return {
        isError: true,
        message: `item with id ${itemId} not found`,
        statusCode: 404,
    };
}
    return { isError: false, message: "item deleted successfully", statusCode: 204};
 };
