import { Router } from 'express';

import { livenessCheck, readinessCheck } from './health.controller.js';

const router = Router();

router.get('/liveness', livenessCheck);
router.get('/readiness', readinessCheck);

export { router as healthRoutes };
