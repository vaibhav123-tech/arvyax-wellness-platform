# Arvyax Wellness Session Platform

This is a full-stack MERN application built for the Arvyax internship assignment. It allows users to register, log in, and manage their own wellness sessions, including creating drafts, publishing, and editing.

**Live Demo:** [https://arvyax-wellness-platform-psi.vercel.app/]

## Features

* **Secure JWT Authentication**: Full user registration and login flow using JSON Web Tokens.
* **Full CRUD for Sessions**: Users have complete control over their sessions with Create, Read, Update, and Delete functionality.
* **Draft & Publish System**: Users can save sessions as private drafts and then publish them to the public dashboard.
* **Public Dashboard**: Displays all published sessions for any visitor to see.
* **Auto-Save**: In the session editor, drafts are automatically saved 5 seconds after a user stops typing.
* **UI/UX Enhancements**:
    * **Skeleton Loaders**: Professional loading skeletons are shown while data is being fetched.
    * **Action Loaders**: Buttons provide instant feedback (e.g., "Deleting...") when performing actions.
    * **Responsive Design**: The UI is fully responsive and works seamlessly on mobile devices and desktops.

## Tech Stack

* **Frontend**: React, Vite, CSS Modules, Axios
* **Backend**: Node.js, Express, Mongoose
* **Database**: MongoDB Atlas

## Local Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/vaibhav123-tech/arvyax-wellness-platform.git](https://github.com/vaibhav123-tech/arvyax-wellness-platform.git)
cd arvyax-wellness-platform