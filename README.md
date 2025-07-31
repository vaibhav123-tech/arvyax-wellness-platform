# Arvyax Wellness Session Platform

This is a full-stack MERN application built for the Arvyax internship assignment. It allows users to register, log in, and manage their own wellness sessions, including creating drafts, publishing, and editing.

**Live Demo:** [https://arvyax-wellness-platform-psi.vercel.app/](https://arvyax-wellness-platform-psi.vercel.app/)

## Features

* **Secure JWT Authentication**: Full user registration and login flow using JSON Web Tokens.
* **Full CRUD for Sessions**: Users have complete control over their sessions with Create, Read, Update, and Delete functionality.
* **Draft & Publish System**: Users can save sessions as private drafts and then publish them to the public dashboard.
* **Public Session Viewing**: Any visitor can view published sessions on the main dashboard and click to see a detailed view.
* **Related Articles**: The session detail page automatically fetches and displays real-time articles from the web related to the session's title.
* **Auto-Save**: In the session editor, drafts are automatically saved 5 seconds after a user stops typing.
* **UI/UX Enhancements**:
    * **Skeleton Loaders**: Professional loading skeletons are shown while data is being fetched.
    * **Action Loaders**: Buttons provide instant feedback (e.g., "Deleting...") when performing actions.
    * **Responsive Design**: The UI is fully responsive and works seamlessly on mobile devices and desktops.

## Tech Stack

* **Frontend**: React, Vite, CSS Modules, Axios
* **Backend**: Node.js, Express, Mongoose
* **Database**: MongoDB Atlas
* **External API**: GNews API

## Local Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/vaibhav123-tech/arvyax-wellness-platform.git](https://github.com/vaibhav123-tech/arvyax-wellness-platform.git)
cd arvyax-wellness-platform

## Backend setup
cd backend
npm install

Create a .env file in the /backend directory and add the following variables:
MONGO_URI=<Your_MongoDB_Connection_String>
JWT_SECRET=<Your_JWT_Secret>
PORT=5000
GNEWS_API_KEY=<Your_GNews_API_Key>
node server.js

## Frontend setup 
cd ../frontend
npm install

Create a .env file in the /frontend directory and add the following variable:
VITE_API_URL=http://localhost:5000

Then, run the client:
npm run dev

## API Documentation:

Auth Routes
POST /api/auth/register: Register a new user.

POST /api/auth/login: Log in a user and receive a JWT.

Session Routes
GET /api/sessions: Get all published sessions (Public).

GET /api/sessions/:id: Get a single published session by ID (Public).

GET /api/sessions/my-sessions: Get all sessions for the logged-in user (Protected).

GET /api/sessions/my-sessions/:id: Get a single session by ID (Protected).

POST /api/sessions/save-draft: Create or update a session draft (Protected).

POST /api/sessions/publish: Publish a session (Protected).

DELETE /api/sessions/my-sessions/:id: Delete a session (Protected).

External API Routes
GET /api/external/articles/:query: Fetches articles related to the query from the GNews API.