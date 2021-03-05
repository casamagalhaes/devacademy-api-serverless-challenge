import {Router} from 'express';
import productsRouter from './products.routes';
import clientsRouter from './clients.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/clients', clientsRouter);

export default routes;
