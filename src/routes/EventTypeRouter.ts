import { Router } from 'express';
import { EventTypeComponent } from '@/components';

const router: Router = Router();

router.get('/', EventTypeComponent.find);

router.post('/', EventTypeComponent.create);

router.get('/:id', EventTypeComponent.findOne);

router.delete('/:id', EventTypeComponent.remove);

export default router;
