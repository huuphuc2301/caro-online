import { Request } from 'express';
import { Showtime, Room, Film } from 'databases/models';
import ResponeCodes from 'utils/constant/ResponeCode';
import ShowtimePayload from './ShowtimePayload';

const getShowtimes = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		data = await Showtime.findAll();
		message = 'Get all successfully!';
		status = ResponeCodes.OK;

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const getShowtimeById = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			data = null;
			message = 'Invalid identifier.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const showtime = await Showtime.findByPk(id);
			if (!showtime) {
				data = null;
				message = 'Not found.';
				status = ResponeCodes.NOT_FOUND;
			} else {
				data = showtime;
				message = 'Get successfully!';
				status = ResponeCodes.OK;
			}
		}

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const getTimeDiff = (checkTime: Date, startTime: Date) => {
	return Math.abs(startTime.getTime() - checkTime.getTime()) / (60 * 1000);
};

const addShowtime = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const newShowtime: ShowtimePayload = req.body;
		const { film, room } = newShowtime;

		if (!newShowtime.startTime || !film || !room) {
			data = null;
			message = 'Null.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const startTime = new Date(newShowtime.startTime);
			const checkShowtimes = await Showtime.findAll({
				include: [
					{
						model: Room,
						where: {
							id: room
						}
					},
					{
						model: Film
					}
				]
				// order: [[Film, 'duration', 'ASC']],
				// limit: 2
			});

			const showtime = await Showtime.create({ ...newShowtime, startTime });
			if (film) await showtime.setFilm(film);
			if (room) await showtime.setRoom(room);

			data = showtime;
			message = 'Add successfully!';
			status = ResponeCodes.CREATED;
		}

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const updateShowtime = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			data = null;
			message = 'Invalid identifier.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const updateShowtime: ShowtimePayload = req.body;

			data = await Showtime.update(updateShowtime, {
				where: {
					id
				}
			});
			message = 'Updated successfully!';
			status = ResponeCodes.OK;
		}

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const deleteShowtime = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			data = null;
			message = 'Invalid identifier.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			data = await Showtime.destroy({
				where: {
					id
				}
			});
			message = 'Deleted successfully!';
			status = ResponeCodes.OK;
		}

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

export { getShowtimes, getShowtimeById, addShowtime, updateShowtime, deleteShowtime };
