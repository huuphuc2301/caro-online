import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'databases';
import Film from './Film';
import Director from './Director';

export interface FilmDirectorModel
	extends Model<InferAttributes<FilmDirectorModel>, InferCreationAttributes<FilmDirectorModel>> {
	id: CreationOptional<number>;
}

const FilmDirector = sequelize.define<FilmDirectorModel>(
	'FilmDirector',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		}
	},
	{
		tableName: 'film_director',
		timestamps: false,
		underscored: true
	}
);

Film.belongsToMany(Director, { through: FilmDirector });
Director.belongsToMany(Film, { through: FilmDirector });

export default FilmDirector;
