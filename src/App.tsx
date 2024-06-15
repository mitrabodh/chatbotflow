import React from 'react';
import Flow from './components/flow/Flow';
import './App.css';
import { AppProvider } from './context/AppContext';



function App() {

  return (
    <AppProvider>
      <Flow />
    </AppProvider>
  );
}

export default App;
