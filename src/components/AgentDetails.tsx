import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAgents } from "../context/AgentsContext";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const AgentDetails: React.FC = () => {
  const { agents } = useAgents();
  const { id } = useParams<{ id: string }>();

  const agent = agents.find((a) => a.id === id);

  if (!agent) return <Typography variant="h6">Agent not found</Typography>;

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "#f4f6f8", // Set the background color here
        minHeight: "100vh", // Make the background cover the full height
      }}
    >
      <Card sx={{ maxWidth: 600, margin: "auto", padding: 4 }}>
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ paddingBottom: 4 }}
          >
            Agent Details
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            <strong>Name:</strong> {agent.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            <strong>Email:</strong> {agent.email}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            <strong>Status:</strong> {agent.status}
          </Typography>
          <Link to="/">
            <Button variant="contained" color="primary" fullWidth>
              Back to list
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AgentDetails;
