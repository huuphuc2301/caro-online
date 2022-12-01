import Router from 'express';
import { addShowtime, deleteShowtime, getShowtime, getShowtimes, updateShowtime } from './cotroller';

const router = Router();

router.get('/pagination', getShowtimes);
router.get('/:id', getShowtime);
router.post('/', addShowtime);
// router.patch('/:id', updateShowtime);
router.delete('/:id', deleteShowtime);

export default router;
