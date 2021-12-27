import { Router } from 'express';

import PasswordController from '../controllers/PasswordController';

const routes = Router();

routes.get('/password', PasswordController.index);
routes.get('/password/:id', PasswordController.show);
routes.post('/password', PasswordController.store);
routes.put('/password/:id', PasswordController.update);
routes.delete('/password/:id', PasswordController.delete);

export default routes;
