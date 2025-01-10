import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AgentsContext } from "../context/AgentsContext";
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
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Delete, Edit, Search, Visibility } from "@mui/icons-material";
import { Agent } from "../types/Agent";

const AgentsList: React.FC = () => {
  const { agents, deleteAgent } = useContext(AgentsContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Agents List
      </Typography>
      <TextField
        label="Search by name or email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/add"
        sx={{ marginBottom: 2 }}
      >
        Add Agent
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
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
                  <IconButton
                    component={Link}
                    to={`/details/${agent.id}`}
                    sx={{
                      marginRight: 1,
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    component={Link}
                    to={`/edit/${agent.id}`}
                    sx={{
                      marginRight: 1,
                      "&:hover": { color: "blue" },
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteAgent(agent.id)}
                    color="error"
                    sx={{
                      "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.1)" },
                      padding: 1,
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AgentsList;
