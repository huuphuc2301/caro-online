import bcrypt from 'bcrypt';
import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	HasManyGetAssociationsMixin,
	HasManyAddAssociationMixin,
	HasManyAddAssociationsMixin,
	HasManyRemoveAssociationMixin,
	HasManyRemoveAssociationsMixin,
	NonAttribute
} from 'sequelize';
import sequelize from 'databases';
import { RoleModel } from './Role';
export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
	// Some fields are optional when calling UserModel.create() or UserModel.build(	)
	id: CreationOptional<number>;
	email: string;
	password: string;
	fullName: string;
	birthDay: Date;
	Roles?: NonAttribute<RoleModel[]>;
	getRoles: HasManyGetAssociationsMixin<RoleModel>;
	addRole: HasManyAddAssociationMixin<RoleModel, number>;
	addRoles: HasManyAddAssociationsMixin<RoleModel, number[]>;
	removeRole: HasManyRemoveAssociationMixin<RoleModel, number>;
	removeRoles: HasManyRemoveAssociationsMixin<RoleModel, number[]>;
}

const User = sequelize.define<UserModel>(
	'User',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		email: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING
		},
		fullName: {
			type: DataTypes.STRING
		},
		birthDay: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'user',
		underscored: true
	}
);

User.beforeCreate(user => {
	const hashedPassword = bcrypt.hashSync(user.password, 10);
	user.password = hashedPassword;
});

User.beforeUpdate(user => {
	console.log('update');
	const hashedPassword = bcrypt.hashSync(user.password, 10);
	user.password = hashedPassword;
});

export default User;
