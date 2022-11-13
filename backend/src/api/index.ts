import { Router } from 'express';
import userRouter from './user';
import loginRouter from './login';
import registerRouter from './register';
import priceRouter from './price';

const router = Router();

router.use('/users', userRouter);
router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/prices', priceRouter);

export default router;
