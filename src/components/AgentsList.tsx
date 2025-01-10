import React, {  useState } from "react";
import { Link } from "react-router-dom";
import { useAgents } from "../context/AgentsContext";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Delete, Edit, Search, Visibility } from "@mui/icons-material";
import { Agent } from "../types/Agent";

const AgentsList: React.FC = () => {
  const { agents, deleteAgent } = useAgents();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f4f6f8" }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="text.primary">
        Agents List
      </Typography>

      <TextField
        label="Search by name or email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          marginBottom: 3,
          backgroundColor: "white",
          borderRadius: 1,
        }}
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
        sx={{
          marginBottom: 3,
          padding: "8px 16px",
          backgroundColor: "#1976d2",
          "&:hover": { backgroundColor: "#1565c0" },
        }}
      >
        Add Agent
      </Button>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 3,
        }}
      >
        {filteredAgents.map((agent: Agent) => (
          <Card
            key={agent.id}
            sx={{
              maxWidth: 345,
              boxShadow: 3,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" color="text.primary" fontWeight="bold">
                {agent.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1 }}>
                <strong>Email:</strong> {agent.email}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1 }}>
                <strong>Status:</strong> {agent.status}
              </Typography>
            </CardContent>

            {/* Action Buttons */}
            <CardActions sx={{ justifyContent: "space-between", padding: 2 }}>
              <IconButton
                component={Link}
                to={`/details/${agent.id}`}
                sx={{
                  color: "primary.main",
                  "&:hover": { color: "secondary.main" },
                }}
              >
                <Visibility />
              </IconButton>
              <IconButton
                component={Link}
                to={`/edit/${agent.id}`}
                sx={{
                  color: "blue",
                  "&:hover": { color: "green" },
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
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AgentsList;
