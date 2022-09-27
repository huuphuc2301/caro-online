import { Router } from 'express';
import { exampleGet } from './controller';

const router = Router();

router.get('/', exampleGet);

export default router;
