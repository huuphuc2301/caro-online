import { NextFunction, Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';

const exampleGet = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.example();
	new ApiResponse(result).send(res);
};

export { exampleGet };
