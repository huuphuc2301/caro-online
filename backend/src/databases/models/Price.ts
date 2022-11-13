import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'databases';

export interface PriceModel extends Model<InferAttributes<PriceModel>, InferCreationAttributes<PriceModel>> {
	id: CreationOptional<number>;
	visionType: number;
	dayCode: string;
	value: number;
	updatedAt: CreationOptional<Date>;
}

const Price = sequelize.define<PriceModel>(
	'Price',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		visionType: {
			allowNull: false,
			type: DataTypes.STRING
		},
		dayCode: {
			allowNull: false,
			type: DataTypes.STRING
		},
		value: {
			type: DataTypes.BIGINT
		},
		updatedAt: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'price',
		timestamps: true,
		createdAt: false,
		underscored: true
	}
);

export default Price;
