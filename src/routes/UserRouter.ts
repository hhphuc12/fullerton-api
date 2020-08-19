import { Router } from 'express';
import { UserComponent } from '@/components';
import * as auth from '@/config/middleware/auth';

const router: Router = Router();

router.get('/', auth.isAuthenticated, UserComponent.find);

router.get('/current', auth.isAuthenticated, UserComponent.getCurrent);

router.post('/', auth.isAuthenticated, UserComponent.create);

router.get('/:id', auth.isAuthenticated, UserComponent.findOne);

router.delete('/:id', auth.isAuthenticated, UserComponent.remove);

export default router;
