import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import { Agent } from "../types/Agent";

interface AgentsState {
  agents: Agent[];
  loading: boolean;
  error: string | null;
}

interface AgentsContextProps extends AgentsState {
  addAgent: (agent: Agent) => void;
  updateAgent: (agent: Agent) => void;
  deleteAgent: (id: string) => void;
}

const initialState: AgentsState = {
  agents: [],
  loading: true,
  error: null,
};

type Action =
  | { type: "FETCH_AGENTS_REQUEST" }
  | { type: "FETCH_AGENTS_SUCCESS"; payload: Agent[] }
  | { type: "FETCH_AGENTS_FAILURE"; payload: string }
  | { type: "ADD_AGENT"; payload: Agent }
  | { type: "UPDATE_AGENT"; payload: Agent }
  | { type: "DELETE_AGENT"; payload: string };

const AgentsContext = createContext<AgentsContextProps | undefined>(undefined);

const agentsReducer = (state: AgentsState, action: Action): AgentsState => {
  switch (action.type) {
    case "FETCH_AGENTS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_AGENTS_SUCCESS":
      return { ...state, loading: false, agents: action.payload };
    case "FETCH_AGENTS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "ADD_AGENT":
      return { ...state, agents: [...state.agents, action.payload] };
    case "UPDATE_AGENT":
      return {
        ...state,
        agents: state.agents.map((agent) =>
          agent.id === action.payload.id ? action.payload : agent
        ),
      };
    case "DELETE_AGENT":
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

  const fetchAgents = async () => {
    dispatch({ type: "FETCH_AGENTS_REQUEST" });

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch agents");
      }

      const data = await response.json();
      const agentsData: Agent[] = data.map((agent: any) => ({
        id: String(agent.id),
        name: agent.name,
        email: agent.email,
        status: "Inactive",
      }));

      dispatch({ type: "FETCH_AGENTS_SUCCESS", payload: agentsData });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      dispatch({ type: "FETCH_AGENTS_FAILURE", payload: errorMessage });
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const addAgent = (agent: Agent) =>
    dispatch({ type: "ADD_AGENT", payload: agent });
  const updateAgent = (agent: Agent) =>
    dispatch({ type: "UPDATE_AGENT", payload: agent });
  const deleteAgent = (id: string) =>
    dispatch({ type: "DELETE_AGENT", payload: id });

  return (
    <AgentsContext.Provider
      value={{ ...state, addAgent, updateAgent, deleteAgent }}
    >
      {children}
    </AgentsContext.Provider>
  );
};

const useAgents = (): AgentsContextProps => {
  const context = React.useContext(AgentsContext);
  if (!context) {
    throw new Error("useAgents must be used within an AgentsProvider");
  }
  return context;
};

export { AgentsProvider, useAgents };
