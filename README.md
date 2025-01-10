# Agent Management Web Application

## Project Description
This web application allows an admin to manage a network of agents. The admin can add, update, view, and delete agents, providing a simple yet effective interface for managing agent information.

## Features Implemented

### Must-Have Features
- **List of Agents**: Displays a list of agents with their Name, Email, and Status (Active/Inactive).
- **Add Agent**: A form to add a new agent with validation for email input.
- **Edit Agent**: Ability to edit existing agent details using the same form.
- **Delete Agent**: Functionality to delete an agent from the list.
- **State Management**: Utilizes React Context for state management.
- **TypeScript**: The application is built using TypeScript for type safety.

### Nice-to-Have Features (if implemented)
- **Search and Filter**: A search bar to filter agents by name or email.
- **Responsive Design**: The UI is responsive and mobile-friendly.
- **Agent Details Page**: Clicking on an agent allows viewing detailed information on a separate page.
- **Persistent Storage**: Agent data is stored in localStorage for persistence across page reloads.
- **API Integration**: Fetches agent data from a mock REST API.

## Instructions for Running the App

To run the application, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/bjmmtin/Agent-Management.git
   
2. Install the dependencies:
    ```bash
    yarn install

3. Start the application:
    ```bash
    npm start
