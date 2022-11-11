import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'databases';
import Film from './Film';
import Category from './Category';

export interface FilmCategoryModel
	extends Model<InferAttributes<FilmCategoryModel>, InferCreationAttributes<FilmCategoryModel>> {
	id: CreationOptional<number>;
}

const FilmCategory = sequelize.define<FilmCategoryModel>(
	'FilmCategory',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		}
	},
	{
		tableName: 'film_category',
		timestamps: false,
		underscored: true
	}
);

Film.belongsToMany(Category, { through: FilmCategory });
Category.belongsToMany(Film, { through: FilmCategory });

export default FilmCategory;
