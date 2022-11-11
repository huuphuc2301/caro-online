import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'databases';
import Nationality from './Nationality';

export interface ActorModel extends Model<InferAttributes<ActorModel>, InferCreationAttributes<ActorModel>> {
	id: CreationOptional<number>;
	fullName: string;
	birthDay: string;
}

const Actor = sequelize.define<ActorModel>(
	'Actor',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		fullName: {
			allowNull: false,
			type: DataTypes.STRING
		},
		birthDay: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'actor',
		timestamps: false,
		underscored: true
	}
);

Nationality.hasOne(Actor);
Actor.belongsTo(Nationality);

export default Actor;
