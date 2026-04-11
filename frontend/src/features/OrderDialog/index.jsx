import React, { useEffect, useCallback, useMemo } from 'react';
import { List, Typography, Skeleton, ListItem, ListItemText } from '@mui/material';
import { fetchOrders, createOrder, updateOrder, deleteOrder } from '../../apis/orderApi';
import { usePromise } from '../../hooks/usePromise';
import AddTextfield from '../../components/AddTextfield';
import EditableTextfield from '../../components/EditableTextfield';
import Dialog from '../../components/Dialog';

const OrderLoadingSkeleton = () => (
  <>
    {new Array(3).fill(0).map((_, i) => (
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

  const handleCreateOrder = useCallback(async (message) => {
    await runCreate(patient.id, message);
    await loadOrders();
  }, [patient, runCreate, loadOrders]);

  const handleUpdateOrder = useCallback(async (orderId, message) => {
    await runUpdate(patient.id, orderId, message);
    await loadOrders();
  }, [patient, runUpdate, loadOrders]);

  const handleDeleteOrder = useCallback(async (orderId) => {
    await runDelete(patient.id, orderId);
    await loadOrders();
  }, [patient, runDelete, loadOrders]);

  const orders = useMemo(() => ordersResponse?.data || [], [ordersResponse]);

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
