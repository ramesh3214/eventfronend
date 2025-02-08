# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh.

## Overview

**OSM Events** is a dynamic event management application that allows users to browse, register, and manage events. The application supports real-time event updates using Socket.IO and provides a modern, responsive UI built with React and Tailwind CSS. The backend is powered by Node.js, Express, and MongoDB.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [License](#license)
- [Contact](#contact)

## Features

- **Real-Time Updates:** Stay informed with live event updates via Socket.IO.
- **Responsive UI:** Modern design built with React and Tailwind CSS that works seamlessly across devices.
- **Event Management:** Browse, register, and manage events with ease.
- **Registration System:** Register for events with an updated count of total registered participants.
- **Backend API:** Robust data handling powered by Node.js, Express, and MongoDB.

## Installation

### Prerequisites

- Node.js (version 14.x or higher)
- MongoDB
- npm or yarn

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
2.**Install dependencies for the backend**
  bash:
  cd backend
  npm install

3. **Install dependencies for the frontend:**  
cd ../frontend
npm install

Configuration
Environment Variables:
Create a .env file in your backend folder with the following variables (adjust values as needed):

.env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Socket.IO Setup:
Ensure your backend is configured to use Socket.IO for real-time updates.

Usage
Running the Backend
Start the backend server by running:

bash

cd backend
npm run dev
Running the Frontend
Start the frontend by running:

bash
cd frontend
npm run dev
Then, open your browser and navigate to http://localhost:3000 to view the application.

API Endpoints
Events
GET /api/eventslist
Returns a list of events sorted by date.

POST /api/events
Creates a new event.
Request Body:

json
{
  "name": "Event Name",
  "description": "Event Description",
  "date": "2023-12-31",
  "time": "18:00",
  "image": "image_url",
  "location": "Event Location",
  "category": "Conference",
  "totalregistered": 0
}
Registrations
POST /api/register
Registers a user for an event and increments the event's total registration count.
Request Body:

json
{
  "userId": "user_id",
  "eventId": "event_id",
  "eventName": "Event Name",
  "eventCategory": "Event Category",
  "name": "User Name",
  "email": "user@example.com",
  "number": "1234567890"
}
GET /api/mybooking
Retrieves all booking registrations.

Tech Stack
Frontend: React, Vite, Tailwind CSS, Framer Motion
Backend: Node.js, Express
Database: MongoDB, Mongoose
Real-Time: Socket.IO
Utilities: Axios, ESLint


License
This project is licensed under the MIT License.

Contact
For any questions or feedback, please contact:
Email: sahramesh1501@gmail.com
GitHub: ramesh3214
