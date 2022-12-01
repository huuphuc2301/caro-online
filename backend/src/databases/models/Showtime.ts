import {
	BelongsToSetAssociationMixin,
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	NonAttribute
} from 'sequelize';
import sequelize from 'databases';
import Room, { RoomModel } from './Room';
import Film, { FilmModel } from './Film';

export interface ShowtimeModel extends Model<InferAttributes<ShowtimeModel>, InferCreationAttributes<ShowtimeModel>> {
	id: CreationOptional<number>;
	startTime: Date;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;

	Film?: NonAttribute<FilmModel>;
	Room?: NonAttribute<RoomModel>;
	setFilm: BelongsToSetAssociationMixin<FilmModel, FilmModel['id']>;
	setRoom: BelongsToSetAssociationMixin<RoomModel, RoomModel['id']>;
}

const Showtime = sequelize.define<ShowtimeModel>(
	'Showtime',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		startTime: {
			allowNull: false,
			type: DataTypes.DATE,
		},
		createdAt: {
			type: DataTypes.DATE
		},
		updatedAt: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'showtime',
		underscored: true
	}
);

Room.hasOne(Showtime);
Showtime.belongsTo(Room);

Film.hasOne(Showtime);
Showtime.belongsTo(Film);

export default Showtime;
