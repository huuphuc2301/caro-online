import { Request } from 'express';
import { Showtime, Room, Film, Seat } from 'databases/models';
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

const getAllShowtimes = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const showtime = await Showtime.findAll();

		data = showtime;
		message = 'Get successfully!';
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

const getShowtimesByFilm = async (filmId: number) => {
	try {
		let data;
		let message: string;
		let status: number;

		const showtime = await Showtime.findAll({
			include: [
				{
					model: Film,
					attributes: [],
					where: {
						id: filmId
					}
				}
			]
		});

		data = showtime;
		message = 'Get successfully!';
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
			const showtime = await Showtime.findByPk(id, {
				include: {
					model: Seat
				}
			});
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

const checkDiffTime = (checkTime: Date, startTime: Date) => {
	return checkTime > startTime;
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
			const curStartTime = new Date(newShowtime.startTime);
			const curFilm = await Film.findByPk(film);
			const curRoom = room;

			const checkShowtimes = await Showtime.findAll({
				include: [
					{
						model: Room,
						attributes: [],
						where: {
							id: curRoom
						}
					},
					{
						model: Film
					}
				]
			});

			const checkResult = checkShowtimes.filter(checkSt => {
				if (checkSt.startTime <= curStartTime) {
					const checkTime = new Date(checkSt.startTime.getTime() + (checkSt.Film.duration + 30) * 60 * 1000);
					return checkDiffTime(checkTime, curStartTime);
				} else {
					const checkTime = new Date(curStartTime.getTime() + (curFilm.duration + 30) * 60 * 1000);
					return checkDiffTime(checkTime, checkSt.startTime);
				}
			});

			if (checkResult.length === 0) {
				const showtime = await Showtime.create(newShowtime);
				if (film) await showtime.setFilm(film);
				if (room) await showtime.setRoom(room);

				data = showtime;
				message = 'Add successfully!';
				status = ResponeCodes.CREATED;
			} else {
				data = null;
				message = 'Conflict showtime';
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

export {
	getShowtimes,
	getShowtimeById,
	getShowtimesByFilm,
	getAllShowtimes,
	addShowtime,
	updateShowtime,
	deleteShowtime
};
