import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'databases';
import Showtime from './Showtime';

export interface SeatModel extends Model<InferAttributes<SeatModel>, InferCreationAttributes<SeatModel>> {
	id: CreationOptional<number>;
	row: string;
	column: string;
	status: string;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
}

const Seat = sequelize.define<SeatModel>(
	'Seat',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		row: {
			allowNull: false,
			type: DataTypes.STRING
		},
		column: {
			allowNull: false,
			type: DataTypes.STRING
		},
		status: {
			type: DataTypes.TINYINT
		},
		createdAt: {
			type: DataTypes.DATE
		},
		updatedAt: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'seat',
		underscored: true
	}
);

Showtime.hasMany(Seat);
Seat.belongsTo(Showtime);

export default Seat;
