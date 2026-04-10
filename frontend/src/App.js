import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, CircularProgress } from '@mui/material';

function App() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchApi = async () => {
    setLoading(true);
    try {
      // The edge nginx will route /api proxy to the backend container
      const res = await fetch('/api');
      const data = await res.json();
      setApiData(data);
    } catch (error) {
      console.error("Error fetching API", error);
      setApiData({ error: 'Failed to fetch from API' });
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          React + MUI + TypeORM Demo
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Welcome to your fullstack application. Click the button below to test the connection to the backend service.
        </Typography>
        <Button variant="contained" color="primary" onClick={fetchApi} disabled={loading} size="large">
          {loading ? <CircularProgress size={24} /> : 'Fetch from Backend'}
        </Button>

        {apiData && (
          <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, textAlign: 'left' }}>
            <Typography variant="h6">API Response:</Typography>
            <pre style={{ overflowX: 'auto', background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
              {JSON.stringify(apiData, null, 2)}
            </pre>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;
