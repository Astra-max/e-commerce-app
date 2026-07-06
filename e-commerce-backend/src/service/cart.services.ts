import { Request } from "express";
import { getAllItemsRepo, getSingleItemRepo } from "../repository/cart.respository"
import { ServiceResponse } from "../model/response";
import { CartItem } from "../model/cart.model";
import isRepositoryError from "../util/repoErr";


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

export const updateSingleitemService = async () => { }

export const addNewItemService = async () => { }

export const deleteAllitemsService = async () => { }

export const deleteSingleitemsService = async () => { }
