interface UserPayload {
	email: string;
	password: string;
	fullName: string;
	birthDay: Date | null;
};

export default UserPayload;
