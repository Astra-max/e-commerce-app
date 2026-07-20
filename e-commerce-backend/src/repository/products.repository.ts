import pool from "../config/dbConnect"
import { logger } from "../util/logger";
import { getAllProductsQuery } from "../query/products.query";
import { ProductType } from "../model/models";

export const getAllProductsRepo = async (): Promise<ProductType[]> => {
    try {
        const products = await pool.query(getAllProductsQuery);
        return products.rows;

    } catch (error: any) {
        logger.warn(`${error}`)
    }
    return [];
}