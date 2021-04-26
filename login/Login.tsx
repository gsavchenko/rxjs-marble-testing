import React from 'react'
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { login } from './store/loginActions';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();

  function onUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(prevUsername => prevUsername = event.target.value);
  }

  function onPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(prevPassword => prevPassword = event.target.value);
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    dispatch(login({ username, password }));
    setUsername(() => '');
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={onUsernameChange}/>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChange}/>
      <input
        type="submit"
        value="Sign In"/>
    </form>
  )
}
