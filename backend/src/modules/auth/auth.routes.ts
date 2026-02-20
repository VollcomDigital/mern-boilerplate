import { Router } from 'express';

import { validate } from '../../middleware/validate.js';
import { register, login, logout } from './auth.controller.js';
import { registerSchema, loginSchema } from './auth.schemas.js';

const router = Router();

router.post('/register', validate({ body: registerSchema }), register);
router.post('/login', validate({ body: loginSchema }), login);
router.post('/logout', logout);

export { router as authRoutes };
