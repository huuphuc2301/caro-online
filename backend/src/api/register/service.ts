import jwt from 'jsonwebtoken';
import config from 'config';
import RegisterPayLoad from './RegisterPayLoad';
import { User } from 'databases/models';
import { UserModel } from 'databases/models/IModel';
import RoleCodes from 'utils/constant/RoleCode';
import ResponeCodes from 'utils/constant/ResponeCode';

interface RegisterResponse {
	user: UserModel;
	token: string;
}

const register = async (newUser: RegisterPayLoad) => {
	let data: RegisterResponse;
	let message: string;
	let status: number;

	const { email, password, fullName, birthDay } = newUser;
	const [user, created] = await User.findOrCreate({
		where: {
			email
		},
		defaults: {
			password,
			fullName,
			birthDay
		}
	});

	if (created) {
		await user.addRole(RoleCodes.CUSTOMER);
		// const roles = await user.getRoles();
		const roleIds = [RoleCodes.CUSTOMER];

		const token = jwt.sign({ userId: user.id, roleIds }, config.secret_key, {
			expiresIn: config.expires_in
		});

		data = {
			user,
			token
		};
		message = 'Register successfully!';
		status = ResponeCodes.CREATED;
	} else {
		data = null;
		message = 'Email exists!';
		status = ResponeCodes.BAD_REQUEST;
	}

	return {
		data,
		message,
		status
	};
};

export { register };
