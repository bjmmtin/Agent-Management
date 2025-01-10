import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AgentsContext } from '../context/AgentsContext';

const AgentDetails: React.FC = () => {
  const { agents } = useContext(AgentsContext);
  const { id } = useParams<{ id: string }>();
  const agent = agents.find((a) => a.id === id);

  if (!agent) return <p>Agent not found</p>;

  return (
    <div>
      <h1>Agent Details</h1>
      <p>Name: {agent.name}</p>
      <p>Email: {agent.email}</p>
      <p>Status: {agent.status}</p>
      <Link to="/">Back to list</Link>
    </div>
  );
};

export default AgentDetails;
