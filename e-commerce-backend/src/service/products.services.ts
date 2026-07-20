import { ProductType } from "../model/models";
import { getAllProductsRepo } from "../repository/products.repository";
import { logger } from "../util/logger"

export const getAllProductsService = async (): Promise<ProductType[]> => {
    try {
        const data = await getAllProductsRepo();
        return data;
    } catch (error) {
        logger.warn(`${error}`)
    }
    return [];
}