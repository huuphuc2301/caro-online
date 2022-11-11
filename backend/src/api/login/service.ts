import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import LoginPayLoad from './LoginPayload';
import { Role, User } from 'databases/models';
import { UserModel } from 'databases/models/IModel';
import ResponeCodes from 'utils/constant/ResponeCode';

interface LoginResponse {
	user: UserModel;
	token: string;
}

const verifyEmail = async (email: string) => {
	const user = await User.findOne({
		where: {
			email
		},
		include: Role
	});
	return user;
};

const login = async (loginData: LoginPayLoad) => {
	let data: LoginResponse;
	let message: string;
	let status: number;
	const { email, password } = loginData;

	const user = await verifyEmail(email);

	if (!user) {
		data = null;
		message = 'Invalid email!';
		status = ResponeCodes.BAD_REQUEST;
	} else {
		const verifyPassword = bcrypt.compareSync(password, user.password);
		if (!verifyPassword) {
			data = null;
			message = 'Invalid password!';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const roles = user.Roles;

			const roleIds = roles.map(role => role.id);

			const token = jwt.sign({ userId: user.id, roleIds }, config.secret_key, {
				expiresIn: config.expires_in
			});

			data = {
				user,
				token
			};
			message = 'Login successfully!';
			status = ResponeCodes.OK;
		}
	}

	return {
		data,
		message,
		status
	};
};

export { login };
