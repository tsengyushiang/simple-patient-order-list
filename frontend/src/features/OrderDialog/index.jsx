import React, { useState, useEffect, useCallback } from 'react';
import { List, Typography, Divider, Skeleton, ListItem, ListItemText } from '@mui/material';
import { fetchOrders, createOrder, updateOrder, deleteOrder } from '../../apis/orderApi';
import { usePromise } from '../../hooks/usePromise';
import AddTextfield from '../../components/AddTextfield';
import EditableTextfield from '../../components/EditableTextfield';
import Dialog from '../../components/Dialog';

const OrderLoadingSkeleton = () => (
  <>
    {[1, 2, 3].map((i) => (
      <ListItem key={i} divider>
        <ListItemText
          primary={<Skeleton variant="text" width="80%" />}
          secondary={<Skeleton variant="text" width="20%" />}
        />
      </ListItem>
    ))}
  </>
);

const OrderDialog = ({ open, onClose, patient }) => {
  const { data: ordersResponse, isLoading: isFetching, execute: runFetch } = usePromise(fetchOrders);
  const { execute: runCreate } = usePromise(createOrder);
  const { execute: runUpdate } = usePromise(updateOrder);
  const { execute: runDelete } = usePromise(deleteOrder);

  const loadOrders = useCallback(async () => {
    if (!patient) return;
    await runFetch(patient.id);
  }, [patient, runFetch]);

  useEffect(() => {
    if (open && patient) {
      loadOrders();
    }
  }, [open, patient, loadOrders]);

  const handleCreateOrder = async (message) => {
    await runCreate(patient.id, message);
    await loadOrders();
  };

  const handleUpdateOrder = async (orderId, message) => {
    await runUpdate(patient.id, orderId, message);
    await loadOrders();
  };

  const handleDeleteOrder = async (orderId) => {
    await runDelete(patient.id, orderId);
    await loadOrders();
  };

  const orders = ordersResponse?.data || [];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={`Orders for ${patient?.name || ''}`}
    >
      <AddTextfield
        label="New Order Message"
        onAdd={handleCreateOrder}
      />

      {isFetching ? (
        <OrderLoadingSkeleton />
      ) : (
        <List>
          {orders.length === 0 ? (
            <Typography sx={{ textAlign: 'center', my: 2, color: 'text.secondary' }}>
              No orders found for this patient.
            </Typography>
          ) : (
            orders.map((order) => (
              <EditableTextfield
                key={order.id}
                item={order}
                onUpdate={handleUpdateOrder}
                onDelete={handleDeleteOrder}
              />
            ))
          )}
        </List>
      )}
    </Dialog>
  );
};

export default OrderDialog;
