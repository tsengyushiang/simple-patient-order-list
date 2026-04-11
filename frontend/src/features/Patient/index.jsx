import React, { useEffect } from 'react';
import { getApiData } from '../../apis/rootApi';
import { usePromise } from '../../hooks/usePromise';
import RefreshableList from '../../components/RefreshableList';
import PatientItem from '../../components/PatientItem';

const Patient = () => {
  const { data, isLoading, execute } = usePromise(getApiData);

  useEffect(() => {
    execute().catch((err) => console.error(err));
  }, [execute]);

  return (
    <RefreshableList 
      title="Enrolled Patients"
      onRefresh={execute}
      displayData={data?.patients || []}
      Loading={isLoading}
      renderItem={(item) => <PatientItem patient={item} />}
    />
  );
};

export default Patient;
