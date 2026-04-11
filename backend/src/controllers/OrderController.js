import * as orderService from "../services/orderService.js";

export const getByPatient = async (req, res, next) => {
    try {
        const { patientId } = req.params;
        const orders = await orderService.getOrdersByPatient(parseInt(patientId));

        res.json({
            status: "success",
            data: orders
        });
    } catch (error) {
        if (error.message === "Patient not found") {
            return res.status(404).json({ status: "error", message: error.message });
        }
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const { patientId } = req.params;
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ status: "error", message: "Order message is required" });
        }

        const newOrder = await orderService.createOrder(parseInt(patientId), message);

        res.status(201).json({
            status: "success",
            data: newOrder
        });
    } catch (error) {
        if (error.message === "Patient not found") {
            return res.status(404).json({ status: "error", message: error.message });
        }
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const { patientId, orderId } = req.params;
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ status: "error", message: "Order message is required" });
        }

        const updatedOrder = await orderService.updateOrder(
            parseInt(patientId),
            parseInt(orderId),
            message
        );

        res.json({
            status: "success",
            data: updatedOrder
        });
    } catch (error) {
        if (error.message === "Order not found") {
            return res.status(404).json({ status: "error", message: error.message });
        }
        if (error.message === "Order does not belong to this patient") {
            return res.status(403).json({ status: "error", message: error.message });
        }
        next(error);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        const { patientId, orderId } = req.params;
        await orderService.deleteOrder(
            parseInt(patientId),
            parseInt(orderId)
        );

        res.json({
            status: "success",
            message: "Order deleted successfully"
        });
    } catch (error) {
        if (error.message === "Order not found") {
            return res.status(404).json({ status: "error", message: error.message });
        }
        if (error.message === "Order does not belong to this patient") {
            return res.status(403).json({ status: "error", message: error.message });
        }
        next(error);
    }
};
