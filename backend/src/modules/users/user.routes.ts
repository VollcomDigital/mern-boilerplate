import { Router } from 'express';

import { authenticate, authorize } from '../../middleware/auth.js';
import { getMe, getUsers, updateMe, deleteMe } from './user.controller.js';

const router = Router();

router.use(authenticate);

router.get('/me', getMe);
router.patch('/me', updateMe);
router.delete('/me', deleteMe);
router.get('/', authorize('admin'), getUsers);

export { router as userRoutes };
