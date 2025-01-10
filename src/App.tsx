import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AgentsList from './components/AgentsList';
import AgentForm from './components/AgentForm';
import AgentDetails from './components/AgentDetails';
import { AgentsProvider } from './context/AgentsContext';
import './App.css';

function App() {
  return (
    <AgentsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AgentsList />} />
          <Route path="/add" element={<AgentForm />} />
          <Route path="/edit/:id" element={<AgentForm />} />
          <Route path="/details/:id" element={<AgentDetails />} />
        </Routes>
      </Router>
    </AgentsProvider>
  );
}

export default App;