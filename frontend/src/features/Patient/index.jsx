import React, { useState, useEffect, useMemo } from 'react';
import { fetchPatients } from '../../apis/patientApi';
import { usePromise } from '../../hooks/usePromise';
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import OrderDialog from '../OrderDialog';
import { pushEvent } from '../../helper/tracker';

const Patient = () => {
  const { data, isLoading, execute } = usePromise(fetchPatients);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(execute, [execute]);

  const handlePatientClick = (patient) => {
    pushEvent('patient_selected', { patientId: patient.id, patientName: patient.name });
    setSelectedPatient(patient);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPatient(null);
  };

  const displayData = useMemo(() => data?.data || [], [data])

  return (
    <>
      <List
        title="Patients"
        displayData={displayData}
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
