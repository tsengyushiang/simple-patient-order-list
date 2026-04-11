import express from 'express';
import patientRoutes from './patientRoutes.js';
import orderRoutes from './orderRoutes.js';

const router = express.Router();

// Mount modular routes
router.use(patientRoutes);
router.use(orderRoutes);

export default router;
