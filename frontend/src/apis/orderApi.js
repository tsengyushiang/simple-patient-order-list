import { invokeApi } from '../helper/invokeApi';

/**
 * Fetch all orders for a specific patient.
 */
export const fetchOrders = async (patientId) => {
  return invokeApi.get(`/api/patients/${patientId}/orders`, {
    failureMessage: 'Failed to fetch orders.'
  });
};

/**
 * Create a new order for a patient.
 */
export const createOrder = async (patientId, message) => {
  return invokeApi.post(`/api/patients/${patientId}/orders`, { message }, {
    successMessage: 'Order created successfully.',
    failureMessage: 'Failed to create order.'
  });
};

/**
 * Update an existing order.
 */
export const updateOrder = async (patientId, orderId, message) => {
  return invokeApi.put(`/api/patients/${patientId}/orders/${orderId}`, { message }, {
    successMessage: 'Order updated successfully.',
    failureMessage: 'Failed to update order.'
  });
};

/**
 * Delete an order.
 */
export const deleteOrder = async (patientId, orderId) => {
  return invokeApi.delete(`/api/patients/${patientId}/orders/${orderId}`, {
    successMessage: 'Order deleted successfully.',
    failureMessage: 'Failed to delete order.'
  });
};
