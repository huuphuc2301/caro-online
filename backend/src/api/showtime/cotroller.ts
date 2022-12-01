import { Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';
import ResponeCodes from 'utils/constant/ResponeCode';

const getShowtimes = async (req: Request, res: Response) => {
	try {
		const result = await service.getShowtimes(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get showtimes.", ResponeCodes.ERROR).send(res);
	}
};

const getShowtime = async (req: Request, res: Response) => {
	try {
		const result = await service.getShowtimeById(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get showtime.", ResponeCodes.ERROR).send(res);
	}
};

const addShowtime = async (req: Request, res: Response) => {
	try {
		const result = await service.addShowtime(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't add showtime.", ResponeCodes.ERROR).send(res);
	}
};

const updateShowtime = async (req: Request, res: Response) => {
	try {
		const result = await service.updateShowtime(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't update showtime.", ResponeCodes.ERROR).send(res);
	}
};

const deleteShowtime = async (req: Request, res: Response) => {
	try {
		const result = await service.deleteShowtime(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't delete showtime.", ResponeCodes.ERROR).send(res);
	}
};

export { getShowtimes, getShowtime, addShowtime, updateShowtime, deleteShowtime };
