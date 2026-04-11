import React from 'react';
import { ListItemText } from '@mui/material';

const PatientItem = ({ patient }) => {
  return (
    <ListItemText 
      primary={patient.name} 
      secondary={`Age: ${patient.age} | Total Orders: ${patient.orders ? patient.orders.length : 0}`} 
    />
  );
};

export default PatientItem;
