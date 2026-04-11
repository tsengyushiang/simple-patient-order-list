import { AppDataSource } from "../data-source.js";
import Order from "../entities/Order.js";
import Patient from "../entities/Patient.js";

export const getOrdersByPatient = async (patientId) => {
    const patientRepository = AppDataSource.getRepository(Patient);
    const orderRepository = AppDataSource.getRepository(Order);

    const patient = await patientRepository.findOneBy({ id: patientId });
    if (!patient) {
        throw new Error("Patient not found");
    }

    return await orderRepository.find({
        where: { patient: { id: patientId } },
        order: { id: "ASC" }
    });
};

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

export const updateOrder = async (patientId, orderId, message) => {
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

    order.message = message;
    return await orderRepository.save(order);
};

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
