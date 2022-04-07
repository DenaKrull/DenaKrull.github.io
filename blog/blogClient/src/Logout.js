import React from 'react'

export default function Logout({ username, setUsername }) {
  const logout = async () => {
    try {
      const response = await fetch('/authentication/logout');
      if (!response.ok) {
        throw new Error('Something went wrong' + response.status);
      }
      setUsername(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      You are logged in as {username}
      <button onClick={logout}>logout</button>
    </div>
  )
}
