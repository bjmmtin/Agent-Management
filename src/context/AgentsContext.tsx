import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { Agent } from '../types/Agent';

interface AgentsState {
  agents: Agent[];
}

interface AgentsContextProps extends AgentsState {
  addAgent: (agent: Agent) => void;
  updateAgent: (agent: Agent) => void;
  deleteAgent: (id: string) => void;
}

const initialState: AgentsState = {
  agents: JSON.parse(localStorage.getItem('agents') || '[]'),
};

const AgentsContext = createContext<AgentsContextProps>({
  ...initialState,
  addAgent: () => {},
  updateAgent: () => {},
  deleteAgent: () => {},
});

const agentsReducer = (state: AgentsState, action: any): AgentsState => {
  switch (action.type) {
    case 'ADD_AGENT':
      return { ...state, agents: [...state.agents, action.payload] };
    case 'UPDATE_AGENT':
      return {
        ...state,
        agents: state.agents.map((agent) =>
          agent.id === action.payload.id ? action.payload : agent
        ),
      };
    case 'DELETE_AGENT':
      return {
        ...state,
        agents: state.agents.filter((agent) => agent.id !== action.payload),
      };
    default:
      return state;
  }
};

const AgentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(agentsReducer, initialState);

  useEffect(() => {
    localStorage.setItem('agents', JSON.stringify(state.agents));
  }, [state.agents]);

  const addAgent = (agent: Agent) => {
    dispatch({ type: 'ADD_AGENT', payload: agent });
  };

  const updateAgent = (agent: Agent) => {
    dispatch({ type: 'UPDATE_AGENT', payload: agent });
  };

  const deleteAgent = (id: string) => {
    dispatch({ type: 'DELETE_AGENT', payload: id });
  };

  return (
    <AgentsContext.Provider value={{ ...state, addAgent, updateAgent, deleteAgent }}>
      {children}
    </AgentsContext.Provider>
  );
};

export { AgentsProvider, AgentsContext };