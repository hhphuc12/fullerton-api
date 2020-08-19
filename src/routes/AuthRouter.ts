import * as jwtConfig from '@/config/middleware/auth';
import { AuthComponent } from '@/components';
import { Router } from 'express';

const router: Router = Router();

router.post('/signup', AuthComponent.signup);

router.post('/login', AuthComponent.login);

router.get('/user', jwtConfig.isAuthenticated, AuthComponent.user);

export default router;
