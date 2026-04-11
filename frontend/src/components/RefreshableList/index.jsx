import React from 'react';
import { Box, CircularProgress, Typography, List, ListItem, ListItemText, Skeleton, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const LoadingScene = () => (
  <>
    {Array.from(new Array(3)).map((_, index) => (
      <ListItem key={`skeleton-${index}`} sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1, boxShadow: 1 }}>
        <ListItemText 
          primary={<Skeleton variant="text" width="60%" />} 
          secondary={<Skeleton variant="text" width="40%" />} 
        />
      </ListItem>
    ))}
  </>
);

const RefreshableList = ({ title, onRefresh, displayData, Loading, renderItem }) => {
  return (
    <Box sx={{ my: 4, textAlign: 'center' }}>
      <Box sx={{ mt: 4, textAlign: 'left' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">{title}</Typography>
          <IconButton color="primary" onClick={onRefresh} disabled={Loading} aria-label="refresh list">
            {Loading ? <CircularProgress size={24} color="inherit" /> : <RefreshIcon />}
          </IconButton>
        </Box>
        <List>
          {Loading ? (
            <LoadingScene />
          ) : (
            displayData && displayData.length > 0 ? (
              displayData.map((item, index) => (
                <ListItem key={item.id || index} sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1, boxShadow: 1 }}>
                  {renderItem ? renderItem(item) : (
                    <ListItemText primary={JSON.stringify(item)} />
                  )}
                </ListItem>
              ))
            ) : (
              <Typography color="text.secondary" sx={{ p: 2 }}>No items available.</Typography>
            )
          )}
        </List>
      </Box>
    </Box>
  );
};

export default RefreshableList;
