import React from 'react';
import { Container } from '@mui/material';

const MainContainer = ({ children }) => {
  return <Container maxWidth="sm">{children}</Container>;
};

export default MainContainer;
