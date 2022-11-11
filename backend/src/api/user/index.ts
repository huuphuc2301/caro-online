import { Router } from 'express';
import { getUsers, getUser, addUser, updateUser, deleteUser } from './controller';
import { verifyToken, verifyAdmin, verifyCustomer } from 'middlewares';

const router = Router();

router.get('/pagination', getUsers);
router.get('/:id', getUser);
router.post('/', addUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
