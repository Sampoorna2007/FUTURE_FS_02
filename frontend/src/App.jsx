import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [authed, setAuthed] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => setAuthed(true);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthed(false);
  };

  return authed ? <Dashboard onLogout={handleLogout} /> : <Login onLogin={handleLogin} />;
}
