import pool from "../config/dbConnect";
import { logger } from "../util/logger";
import {
    deleteAllItemsQuery,
    deleteSingleItemQuery,
    getAllItemsQuery,
    getSingleItemQuery,
    updateItemQuery,
} from "../query/cart.query";
import { CartItem } from "../model/cart.model";
import { addItemQuery } from "../query/cart.query";

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
    itemId: string,
): Promise<CartItem | null> => {
    try {
        const singleItem = await pool.query(getSingleItemQuery, [itemId]);
        return singleItem.rows[0] ?? null;
    } catch (error: any) {
        logger.warn(`Failed to get single cart item ${error}`);
    }
    return null;
};

export const updateItemRepo = async (
    itemId: string,
): Promise<CartItem | null> => {
    // Implementation for updating a cart item
    try {
        const updateItem = await pool.query(updateItemQuery, [itemId]);
        return updateItem.rows[0] ?? null;
    } catch (error: any) {
        logger.warn(`Failed to update item ${error}`);
    }
    return null;
};

export const saveItemRepo = async () => {
    // Implementation for saving a cart item
    try {
        const saveItem = await pool.query(addItemQuery);
        return;
    } catch (error) {
        logger.warn(`Failed to save cart item to db ${error}`);
    }
    return;
};

export const deleteSingleItemRepo = async (
    itemId: string,
): Promise<boolean> => {
    // Implementation for deleting a single cart item
    try {
        const deletedItem = await pool.query(deleteSingleItemQuery, [itemId]);
        return true;
    } catch (error) {
        logger.warn(`Failed to delete cart item ${error}`);
    }
    return false;
};

export const deleteAllItemsRepo = async (): Promise<boolean> => {
    // Implementation for deleting all cart items
    try {
        const deleteAll = await pool.query(deleteAllItemsQuery);
        return true;
    } catch (error) {
        logger.warn(`Failed to clear cart table ${error}`);
    }
    return false;
};
