import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AgentsContext } from '../context/AgentsContext';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { Agent } from '../types/Agent';

const AgentsList: React.FC = () => {
  const { agents, deleteAgent } = useContext(AgentsContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Agents List</h1>
      <TextField
        label="Search by name or email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="contained" color="primary" component={Link} to="/add">
        Add Agent
      </Button>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAgents.map((agent: Agent) => (
              <TableRow key={agent.id}>
                <TableCell>{agent.name}</TableCell>
                <TableCell>{agent.email}</TableCell>
                <TableCell>{agent.status}</TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/details/${agent.id}`}>
                    <Visibility />
                  </IconButton>
                  <IconButton component={Link} to={`/edit/${agent.id}`}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => deleteAgent(agent.id)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AgentsList;
