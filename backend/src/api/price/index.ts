import Router from 'express';
import { getPrices, updatePrice } from './controller';

const router = Router();
router.get('/', getPrices);
router.put('/:id', updatePrice);

export default router;
