import { useState } from 'react';
import api from '../api/axios';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handle = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const payload = isRegister ? form : { email: form.email, password: form.password };
      const { data } = await api.post(endpoint, payload);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));
      onLogin();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>🗂 Mini CRM</h1>
        <h2>{isRegister ? 'Create Admin Account' : 'Admin Login'}</h2>
        <form onSubmit={submit}>
          {isRegister && (
            <input name="name" placeholder="Full Name" required onChange={handle} />
          )}
          <input name="email" type="email" placeholder="Email" required onChange={handle} />
          <input name="password" type="password" placeholder="Password" required onChange={handle} />
          {error && <p className="error">{error}</p>}
          <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
        </form>
        <p className="toggle-link" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        </p>
      </div>
    </div>
  );
}
