import { ProductType } from "../model/models";
import { getAllProductsRepo } from "../repository/products.repository";
import { logger } from "../util/logger";

export const getAllProductsService = async (
    limit = 10,
    offset = 0
): Promise<ProductType[]> => {
    try {
        const data = await getAllProductsRepo(limit, offset);
        return data;
    } catch (error) {
        logger.warn(`${error}`);
    }
    return [];
}