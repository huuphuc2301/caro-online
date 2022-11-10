import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'databases';
import Rated from './Rated';
import Nationality from './Nationality';

export interface FilmModel extends Model<InferAttributes<FilmModel>, InferCreationAttributes<FilmModel>> {
	id: CreationOptional<number>;
	title: string;
	imageUrl: string;
	trailerUrl: string;
	duration: number;
	openingDay: Date;
	description: string;
}

const Film = sequelize.define<FilmModel>(
	'Film',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		title: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		},
		imageUrl: {
			type: DataTypes.STRING
		},
		trailerUrl: {
			type: DataTypes.STRING
		},
		duration: {
			type: DataTypes.SMALLINT
		},
		openingDay: {
			type: DataTypes.DATE
		},
		description: {
			type: DataTypes.STRING
		}
	},
	{
		tableName: 'film',
		timestamps: false,
		underscored: true
	}
);

Rated.hasOne(Film);
Film.belongsTo(Rated);

Nationality.hasOne(Film);
Film.belongsTo(Nationality);

export default Film;
