import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'databases';

export interface RoomModel extends Model<InferAttributes<RoomModel>, InferCreationAttributes<RoomModel>> {
	id: CreationOptional<number>;
	name: string;
	visionType: string;
}

const Room = sequelize.define<RoomModel>(
	'Room',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		},
		visionType: {
			type: DataTypes.STRING
		},
		columnNumber: {
			type: DataTypes.INTEGER
		},
		rowNumber: {
			type: DataTypes.INTEGER
		}
	},
	{
		tableName: 'room',
		underscored: true
	}
);

export default Room;
