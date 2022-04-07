import React from 'react'
import useForm from './useForm';

export default function Login({ setUsername ,setError}) {
  const [formData, setFormData] = useForm({ username: '', password: '' });

  const login = async () => {
    try {
      const response = await fetch('/authentication/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Something went wrong' + response.status);
      }
      setUsername(formData.username);
    } catch (e) {
      setError(e.message);
    }
  };

  const register = async() => {
    try {
      const response = await fetch('/authentication/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Something went wrong' + response.status);
      }
  
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <form onSubmit={e => e.preventDefault()}>
      <input name="username" type="text" placeholder="username" required value={formData.username} onChange={setFormData} />
      <input name="password" type="password" placeholder="password" required value={formData.password} onChange={setFormData} />
      <button onClick={login}>login</button>
      <button onClick={register}>register</button>
    </form>
  )
}
