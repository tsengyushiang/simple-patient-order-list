import React from 'react';
import MainContainer from './components/MainContainer';
import GlobalToast from './features/GlobalToast';
import Patient from './features/Patient';

function App() {
  return (
    <>
      <GlobalToast />
      <MainContainer>
        <Patient />
      </MainContainer>
    </>
  );
}

export default App;
