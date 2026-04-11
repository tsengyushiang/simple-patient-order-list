import React from 'react';
import { ListItemText, ListItemButton } from '@mui/material';

const ListItem = ({ item, onClick }) => {
  return (
    <ListItemButton 
      onClick={() => onClick(item)}
      sx={{ 
        width: '100%',
        bgcolor: 'background.paper', 
        mb: 1, 
        borderRadius: 1, 
        boxShadow: 1,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
          bgcolor: 'action.hover'
        }
      }}
    >
      <ListItemText 
        primary={item.name} 
      />
    </ListItemButton>
  );
};

export default ListItem;
