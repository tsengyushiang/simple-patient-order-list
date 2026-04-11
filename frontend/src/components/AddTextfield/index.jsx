import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddTextfield = ({ label = "Message", onAdd }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleAdd = () => {
    if (!value.trim()) {
      setError(true);
      return;
    }
    onAdd(value);
    setValue('');
    setError(false);
  };

  const handleBlur = () => {
    const isValid = value.trim().length > 0;
    setError(!isValid);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (error && newValue.trim().length > 0) {
      setError(false);
    }
  };

  return (
    <Box sx={{ mb: 4, display: 'flex', gap: 1, alignItems: 'center' }}>
      <TextField
        label={label}
        variant="standard"
        size="small"
        fullWidth
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error}
        helperText={error ? "Field cannot be empty" : ""}
      />
      <Button 
        variant="contained" 
        startIcon={<AddIcon />}
        onClick={handleAdd}
        sx={{ height: '40px' }}
      >
        Add
      </Button>
    </Box>
  );
};

export default AddTextfield;
