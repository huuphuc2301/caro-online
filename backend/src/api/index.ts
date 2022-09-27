import { Router } from 'express';
import exampleRouters from './example';

const router = Router();
import { asyncRouteHandler } from 'middlewares';

router.use('/example', asyncRouteHandler(exampleRouters));

export default router;
