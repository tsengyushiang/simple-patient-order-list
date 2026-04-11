import express from 'express';
import * as OrderController from '../controllers/OrderController.js';

const router = express.Router();

/**
 * @swagger
 * /patients/{patientId}/orders:
 *   get:
 *     summary: Get all orders for a specific patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of orders
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
 *                       message:
 *                         type: string
 *                       deletedAt:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 */
router.get('/patients/:patientId/orders', OrderController.getByPatient);

/**
 * @swagger
 * /patients/{patientId}/orders:
 *   post:
 *     summary: Create a new order for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     message:
 *                       type: string
 *                     deletedAt:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 */
router.post('/patients/:patientId/orders', OrderController.create);

/**
 * @swagger
 * /patients/{patientId}/orders/{orderId}:
 *   put:
 *     summary: Update an existing order
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     message:
 *                       type: string
 *                     deletedAt:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 */
router.put('/patients/:patientId/orders/:orderId', OrderController.update);

/**
 * @swagger
 * /patients/{patientId}/orders/{orderId}:
 *   delete:
 *     summary: Delete an order
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order deleted
 */
router.delete('/patients/:patientId/orders/:orderId', OrderController.deleteOrder);

export default router;
