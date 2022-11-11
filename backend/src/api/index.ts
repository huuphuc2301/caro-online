import { Router } from 'express';
import userRouter from './user';
import loginRouter from './login';
import registerRouter from './register';

const router = Router();

router.use('/users', userRouter);
router.use('/login', loginRouter);
router.use('/register', registerRouter);

export default router;
