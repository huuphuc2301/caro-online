import { ApiResponse } from 'utils/rest/ApiResponse';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.tokenLogin;
	try {
		const verify = jwt.verify(token, process.env.JWT_SECRET);
		if (verify) {
			req.body.user = verify;
			next();
		}
	} catch (error) {
		new ApiResponse(error, 'Login failure!', 401).send(res);
	}
};

export { authenticationMiddleware };
