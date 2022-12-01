import { Router } from 'express';
import loginRouter from './login';
import registerRouter from './register';
import userRouter from './user';
import nationalityRouter from './nationality';
import actorRouter from './actor';
import directorRouter from './director';
import categoryRouter from './category';
import filmRouter from './film';
import bannerRouter from './banner';
import roomRouter from './room';
import showtimeRouter from './showtime';

const router = Router();

router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/users', userRouter);
router.use('/nationalities', nationalityRouter);
router.use('/actors', actorRouter);
router.use('/directors', directorRouter);
router.use('/categories', categoryRouter);
router.use('/films', filmRouter);
router.use('/banners', bannerRouter);
router.use('/rooms', roomRouter);
router.use('/showtimes', showtimeRouter);

export default router;
