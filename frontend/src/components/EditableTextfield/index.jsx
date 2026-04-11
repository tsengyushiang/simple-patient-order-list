import React, { useState } from 'react';
import { ListItem as MuiListItem, ListItemText, IconButton, TextField, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';

const EditableTextfield = ({ item, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editMessage, setEditMessage] = useState(item.message);
  const [error, setError] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditMessage(item.message);
    setError(false);
  };

  const handleSave = () => {
    if (!editMessage.trim()) {
      setError(true);
      return;
    }
    onUpdate(item.id, editMessage);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(false);
  };

  const handleBlur = () => {
    const isValid = editMessage.trim().length > 0;
    setError(!isValid);
  };

  return (
    <MuiListItem
      divider
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 1,
        padding: "8px 0px",
      }}
    >
      {isEditing ? (
        <>
          <TextField
            fullWidth
            size="small"
            value={editMessage}
            onChange={(e) => setEditMessage(e.target.value)}
            onBlur={handleBlur}
            error={error}
            helperText={error ? "Field cannot be empty" : ""}
          />
          <Box sx={{ display: 'flex', mt: { xs: 1, sm: 0 } }}>
            <IconButton color="primary" onClick={handleSave}>
              <SaveIcon />
            </IconButton>
            <IconButton onClick={handleCancel}>
              <CancelIcon />
            </IconButton>
          </Box>
        </>
      ) : (
        <>
          <ListItemText
            primary={item.message}
          />
          <Box sx={{ display: 'flex', mt: { xs: 1, sm: 0 } }}>
            <IconButton color="info" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => onDelete(item.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </>
      )}
    </MuiListItem>
  );
};

export default EditableTextfield;
