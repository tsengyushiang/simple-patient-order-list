import React from 'react';
import { Box, Typography, List as MuiList, ListItem, ListItemText, Skeleton } from '@mui/material';

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

const List = ({ title, displayData, Loading, renderItem }) => {
  return (
    <Box sx={{ my: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <MuiList>
        {Loading ? (
          <LoadingScene />
        ) : (
          displayData && displayData.length > 0 ? (
            displayData.map((item, index) => (
              <React.Fragment key={item.id || index}>
                {renderItem ? renderItem(item) : (
                  <ListItem sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1, boxShadow: 1 }}>
                    <ListItemText primary={JSON.stringify(item)} />
                  </ListItem>
                )}
              </React.Fragment>
            ))
          ) : (
            <Typography color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>No items available.</Typography>
          )
        )}
      </MuiList>
    </Box>
  );
};

export default List;
