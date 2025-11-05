# testing-sessions

A simple Elm-architecture application for testing sessions.

## Features

- Elm Architecture pattern (Model-View-Update)
- Real-time clock display
- Status information display
- Clean, functional UI
- Single-page application

## Available Views

- `/` - Home page with application information
- Application status - Status information (updated in real-time)
- Time display - Current time (updated every second)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

```bash
# Start the application (opens in browser automatically)
npm start

# Or run the dev server
npm run dev
```

The application will start on `http://localhost:3000` and open automatically in your browser.

### Testing

Open your browser and navigate to `http://localhost:3000` to see:
- The home page with available endpoint information
- Real-time application status
- Real-time clock with ISO timestamp and millisecond timestamp

## Architecture

This application follows the Elm Architecture pattern:

- **Model**: Immutable data structure representing application state
- **View**: Pure functions that render HTML based on the model
- **Update**: Pure functions that transform the model based on messages

The application updates every second to display the current time, demonstrating reactive updates in the Elm architecture style.

## Implementation Details

Due to network restrictions preventing access to the Elm package registry, this implementation uses JavaScript following the Elm Architecture pattern. It provides the same functionality and structure as a pure Elm application would, including:

- Immutable state updates
- Message-based state changes
- Pure view functions
- Time subscriptions