import pool from "../model/model";
import { logger } from "../util/logger";
import { getAllItemsQuery } from "../query/cart.query"


export const getAllItemsRepo = async () => {
    try {
        const allItems = await pool.query(getAllItemsQuery)
    } catch (error: any) {
        logger.warn(`Failed to get all cart items ${error}`)
    }
}

export const getSingleItemRepo = async () => {}

export const updateItemRepo = async () => {}

export const saveItemRepo = async () => {}

export const deleteSingleItemRepo = async () => {}

export const deleteAllItemsRepo = async () => {}
