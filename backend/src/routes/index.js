import express from 'express';
import apiRoutes from './api.js';

const router = express.Router();

// Mount api routes
router.use('/', apiRoutes); // Nginx routes /api/ to backend / 

export default router;
