import { Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';

// GET: /users/pagination
const getUsers = async (req: Request, res: Response) => {
	const result = await service.getUsers(req);
	new ApiResponse(result).send(res);
};

// GET: /users/:id
const getUser = async (req: Request<{ id: number }>, res: Response) => {
	const result = await service.getUserById(req);
	const { data, message, status } = result;
	return new ApiResponse(data, message, status).send(res);
};

// POST: /users
const addUser = async (req: Request, res: Response) => {
	const result = await service.addUser(req);
	const { data, message, status } = result;
	return new ApiResponse(data, message, status).send(res);
};

// PATCH: /users/:id
const updateUser = async (req: Request<{ id: number }>, res: Response) => {
	const result = await service.updateUser(req);
	const { data, message, status } = result;
	return new ApiResponse(data, message, status).send(res);
};

// DELETE: /users/:id
const deleteUser = async (req: Request<{ id: number }>, res: Response) => {
	const result = await service.deleteUser(req);
	const { data, message, status } = result;
	return new ApiResponse(data, message, status).send(res);
};

export { getUsers, getUser, addUser, updateUser, deleteUser };
