import { Request, Response } from 'express';
import { ApiResponse } from 'utils/rest/ApiResponse';
import * as service from './service';

const getPrices = async (req: Request, res: Response) => {
	const result = await service.getAllPrices();
	new ApiResponse(result).send(res);
};

const updatePrice = async (req: Request, res: Response) => {
	const result = await service.updatePriceById(req);
	new ApiResponse(result).send(res);
};

export { getPrices, updatePrice };
