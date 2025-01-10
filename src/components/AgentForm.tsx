import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useAgents } from "../context/AgentsContext";
import { Agent } from "../types/Agent";

const AgentForm: React.FC = () => {
  const { addAgent, updateAgent, agents } = useAgents();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const [formState, setFormState] = useState<Agent>({
    id: "",
    name: "",
    email: "",
    status: "Inactive",
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

    navigate("/");
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 600,
        margin: "0 auto",
        backgroundColor: "#fff",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {isEditMode ? "Edit Agent" : "Add Agent"}
      </Typography>
      <form onSubmit={handleSubmit}>
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
            sx={{ marginTop: 0.5 }}
            name="status"
            value={formState.status}
            onChange={handleSelectChange}
            required
            label="status"
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            {isEditMode ? "Update" : "Add"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AgentForm;
