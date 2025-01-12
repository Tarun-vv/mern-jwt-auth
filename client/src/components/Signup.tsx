import React, { useState } from 'react';
import { signin } from '../services/data-service';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    signin({ email, password, passwordConfirm });

    setEmail('');
    setPassword('');
    setPasswordConfirm('');
  }

  return (
    <div>
      <h1>Sign in to create a new account</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="passwordConfirm">Password Confirm</label>
          <input
            type="password"
            placeholder="Password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
