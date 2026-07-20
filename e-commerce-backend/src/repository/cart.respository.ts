import pool from "../config/dbConnect";
import { logger } from "../util/logger";
import {
    deleteAllItemsQuery,
    deleteSingleItemQuery,
    getAllItemsQuery,
    getSingleItemQuery,
    updateItemQuery,
} from "../query/cart.query";
import { CartItem } from "../model/models";
import { addItemQuery } from "../query/cart.query";
import { ServiceResponse } from "../model/response";

export const getAllItemsRepo = async (): Promise<CartItem[]> => {
    try {
        const allItems = await pool.query(getAllItemsQuery);
        return allItems.rows;
    } catch (error: any) {
        logger.warn(`Failed to get all cart items ${error}`);
    }
    return [] as CartItem[];
};

export const getSingleItemRepo = async (
    itemId: string, userId: string,
): Promise<ServiceResponse<CartItem>> => {

    try {
        const singleItem = await pool.query(getSingleItemQuery, [itemId, userId]);

        if (singleItem.rowCount != null) {
            logger.warn(`Found item with id ${itemId}`);
            return { isError: false, message: "item found successfully", statusCode: 200, data: singleItem.rows[0] };
        }
    } catch (error: any) {
        logger.warn(`Failed to get single cart item ${error}`);
    }
    return { isError: true, message: "Error fetching item", statusCode: 500 };
};

// Implementation for updating a cart item
export const updateItemRepo = async (
    itemId: string,
): Promise<ServiceResponse<CartItem>> => {
    try {
        const updateItem = await pool.query(updateItemQuery, [itemId]);
        logger.info(`Item updated successfully`);
        return { isError: false, message: "updated successfully", statusCode: 200, data: updateItem.rows[0] };
    } catch (error: any) {
        logger.warn(`Failed to update item ${error}`);
    }
    return { isError: true, message: "Failed to get cart item", statusCode: 500 };
};

// Implementation for saving a cart item
export const saveItemRepo = async (item: CartItem): Promise<boolean> => {
    const {
        userId,
        productId,
        productName,
        productDescription,
        productCategory,
        quantity,
        productPrice,
        productImage
    } = item;
    try {
        const saveItem = await pool.query(addItemQuery,
            [userId, productId, productName, productDescription,
                productCategory, quantity, productPrice, productImage
            ]
        );

        if (saveItem.rowCount == null) return false
    } catch (error) {
        logger.warn(`Failed to save cart item to db ${error}`);
        return false;
    }
    return true;
};

export const deleteSingleItemRepo = async (itemId: string, userId: string,
): Promise<ServiceResponse<CartItem>> => {
    try {
        const deletedItem = await pool.query(deleteSingleItemQuery, [itemId, userId]);
        if (deletedItem.rowCount != null) {
            logger.warn(`cart item deleted successfully`);
             return { isError: false, message: "item deleted succefully", statusCode: 204, data: deletedItem.rows[0] };
        }
    } catch (error) {
        logger.warn(`Failed to delete cart item ${error}`);
    }
    return { isError: true, message: `Failed to delete item with id ${userId}`, statusCode: 500};
};

// Implementation for deleting all cart items
export const deleteAllItemsRepo = async (): Promise<ServiceResponse<Number>> => {
    try {
        const deleteAll = await pool.query(deleteAllItemsQuery);
        logger.info(`Deleted all items from user cart`);
        return { isError: false, message: "cart item deleted successfully", statusCode: 204, data: deleteAll.rows.length}
    } catch (error) {
        logger.warn(`Failed to clear cart table ${error}`);
    }
    return { isError: true, message: "Failed to clear user's cart", statusCode: 500};
};
