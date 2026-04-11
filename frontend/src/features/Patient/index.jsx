import React, { useState, useEffect, useCallback } from 'react';
import { fetchPatients } from '../../apis/patientApi';
import { usePromise } from '../../hooks/usePromise';
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import OrderDialog from '../OrderDialog';

const Patient = () => {
  const { data, isLoading, execute } = usePromise(fetchPatients);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const initData = useCallback(async () => {
    try {
      await execute();
    } catch (err) {
      console.error(err);
    }
  }, [execute]);

  useEffect(() => {
    initData();
  }, [initData]);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPatient(null);
  };

  return (
    <>
      <List
        title="Patients"
        displayData={data?.data || []}
        Loading={isLoading}
        renderItem={(item) => (
          <ListItem
            item={item}
            onClick={handlePatientClick}
          />
        )}
      />
      <OrderDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        patient={selectedPatient}
      />
    </>
  );
};

export default Patient;
