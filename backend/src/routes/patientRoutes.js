import express from 'express';
import * as PatientController from '../controllers/PatientController.js';

const router = express.Router();

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Retrieve a list of patients
 *     responses:
 *       200:
 *         description: A list of patients.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 */
router.get('/patients', PatientController.getAll);

export default router;
