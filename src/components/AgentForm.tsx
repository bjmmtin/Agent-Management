import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { AgentsContext } from '../context/AgentsContext';
import { Agent } from '../types/Agent';

const AgentForm: React.FC = () => {
  const { addAgent, updateAgent, agents } = useContext(AgentsContext);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const [formState, setFormState] = useState<Agent>({
    id: '',
    name: '',
    email: '',
    status: 'Inactive',
  });

  useEffect(() => {
    if (isEditMode) {
      const existingAgent = agents.find((agent) => agent.id === id);
      if (existingAgent) setFormState(existingAgent);
    }
  }, [id, agents, isEditMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name!]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode) {
      updateAgent(formState);
    } else {
      addAgent({ ...formState, id: Date.now().toString() });
    }

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{isEditMode ? 'Edit Agent' : 'Add Agent'}</h1>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formState.name}
        onChange={handleInputChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formState.email}
        onChange={handleInputChange}
        margin="normal"
        required
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={formState.status}
          onChange={handleSelectChange}
          required
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
      </FormControl>
      <button type="submit">{isEditMode ? 'Update' : 'Add'}</button>
      <button type="button" onClick={() => navigate('/')}>Cancel</button>
    </form>
  );
};

export default AgentForm;
