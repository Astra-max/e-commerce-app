import { Request, Response } from "express";
import { getAllProductsService } from "../service/products.services";
import { logger } from "../util/logger";

export const HandleGetAllProducts = async (req: Request, res: Response) => {
    try {
        const limit = Number(req.query.limit) || 10;
        const offset = Number(req.query.offset) || 0;
        const data = await getAllProductsService(limit, offset);
        return res.status(200).json({ data });
    } catch (error) {
        logger.warn(`${error}`);
    }
    return res.status(500).json({ message: "server error" });
}

export const HandleGetProductById = async (req: Request, res: Response) => {}

export const HandleSaveProduct = async (req: Request, res: Response) => {}

export const HandleUpdateProductById = async (req: Request, res: Response) => {}

export const HandleDeleteProductById = async (req: Request, res: Response) => {}

