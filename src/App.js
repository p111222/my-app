import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RealTimeData from './components/RealTimeData';  // Adjust the import path as necessary
import TabularView from './components/TabularView';
import { Button, Container } from '@mui/material'; // Import MUI components

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Container>
          <h1 style={{  marginLeft: '400px' }}>Welcome to Real Time Data</h1>
          {/* Navigation Buttons */}
          <div style={{ marginBottom: '20px', marginLeft: '480px' }}>
            <Button
              component={Link}
              to="/cardview"
              variant="contained"
              color="primary"
              sx={{ marginRight: 2 }}
            >
              Card View
            </Button>
            <Button
              component={Link}
              to="/tabularview"
              variant="contained"
              color="primary"
            >
              Tabular View
            </Button>
          </div>

          <Routes>
            <Route path="/"/>
            <Route path="/cardview" element={<RealTimeData />} />
            <Route path="/tabularview" element={<TabularView />} />
          </Routes>
        </Container>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
