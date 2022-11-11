import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'databases';
import User from './User';

export interface TicketModel extends Model<InferAttributes<TicketModel>, InferCreationAttributes<TicketModel>> {
	id: CreationOptional<number>;
	room: string;
	seatRow: string;
	seatColumn: string;
	time: Date;
	price: number;
}

const Ticket = sequelize.define<TicketModel>(
	'Ticket',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		room: {
			allowNull: false,
			type: DataTypes.STRING
		},
		seatRow: {
			allowNull: false,
			type: DataTypes.STRING
		},
		seatColumn: {
			allowNull: false,
			type: DataTypes.STRING
		},
		time: {
			allowNull: false,
			type: DataTypes.TIME
		},
		price: {
			allowNull: false,
			type: DataTypes.BIGINT
		}
	},
	{
		tableName: 'ticket',
		underscored: true
	}
);

User.hasOne(Ticket);
Ticket.belongsTo(User);

export default Ticket;
