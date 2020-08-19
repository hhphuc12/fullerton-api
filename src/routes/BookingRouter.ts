import { Router } from 'express';
import { BookingComponent } from '@/components';
import * as auth from '@/config/middleware/auth';
import * as permission from '@/config/middleware/permission';

const router: Router = Router();

router.get('/', auth.isAuthenticated, BookingComponent.find);

router.post('/', auth.isAuthenticated, permission.isUser, BookingComponent.create);

router.patch('/:id', auth.isAuthenticated, permission.isAdmin, BookingComponent.update);

router.get('/:id', auth.isAuthenticated, BookingComponent.findOne);

router.delete('/:id', auth.isAuthenticated, permission.isUser, BookingComponent.remove);

export default router;
