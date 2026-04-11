import { AppDataSource } from "../data-source.js";
import Order from "../entities/Order.js";
import Patient from "../entities/Patient.js";

/**
 * Get all orders for a specific patient.
 * @param {number} patientId 
 * @returns {Promise<Array>}
 */
export const getOrdersByPatient = async (patientId) => {
    const patientRepository = AppDataSource.getRepository(Patient);
    const orderRepository = AppDataSource.getRepository(Order);

    // Verify patient exists
    const patient = await patientRepository.findOneBy({ id: patientId });
    if (!patient) {
        throw new Error("Patient not found");
    }

    return await orderRepository.find({
        where: { patient: { id: patientId } },
        order: { id: "ASC" }
    });
};

/**
 * Create a new order for a patient.
 * @param {number} patientId 
 * @param {string} message 
 * @returns {Promise<Object>}
 */
export const createOrder = async (patientId, message) => {
    const patientRepository = AppDataSource.getRepository(Patient);
    const orderRepository = AppDataSource.getRepository(Order);

    const patient = await patientRepository.findOneBy({ id: patientId });
    if (!patient) {
        throw new Error("Patient not found");
    }

    const newOrder = orderRepository.create({
        message,
        patient
    });

    return await orderRepository.save(newOrder);
};

/**
 * Update an existing order message.
 * Verify that the order exists and belongs to the patient.
 * @param {number} patientId
 * @param {number} orderId 
 * @param {string} message 
 * @returns {Promise<Object>}
 */
export const updateOrder = async (patientId, orderId, message) => {
    const orderRepository = AppDataSource.getRepository(Order);

    // Find order with patient relation
    const order = await orderRepository.findOne({
        where: { id: orderId },
        relations: ["patient"]
    });

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.patient.id !== patientId) {
        throw new Error("Order does not belong to this patient");
    }

    order.message = message;
    return await orderRepository.save(order);
};

/**
 * Delete an order by ID.
 * Verify that the order exists and belongs to the patient.
 * @param {number} patientId
 * @param {number} orderId 
 * @returns {Promise<boolean>} returns true if deleted
 */
export const deleteOrder = async (patientId, orderId) => {
    const orderRepository = AppDataSource.getRepository(Order);

    const order = await orderRepository.findOne({
        where: { id: orderId },
        relations: ["patient"]
    });

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.patient.id !== patientId) {
        throw new Error("Order does not belong to this patient");
    }

    const result = await orderRepository.softDelete(orderId);
    return result.affected > 0;
};
