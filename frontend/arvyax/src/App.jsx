import './App.css';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MySessionsPage from './pages/MySessionsPage';
import SessionEditorPage from './pages/SessionEditorPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/my-sessions" element={<MySessionsPage />} />
      <Route path="/editor" element={<SessionEditorPage />} />
      {/* We will add a route for editing a specific session later */}
    </Routes>
  );
}

export default App;