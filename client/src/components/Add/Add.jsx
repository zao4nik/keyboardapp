import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Signin } from '../Signin/Signin';
import './Add.styles.css';

export default function Add() {
  const isAuth = useSelector((store) => store.isAuth);
  console.log('🚀  isAuth==>', isAuth);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const userID = useSelector((state) => state?.user?.userId);
  if (userID) console.log('🚀  userID==>', userID);
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3001/game/game_add', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ title, text, userID }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    setTitle('');
    setText('');
  };

  return isAuth ? (
    <form onSubmit={handleSubmit}>
      <label htmlFor="ExampleTitleInput">
        Title:
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      <br />
      <label htmlFor="ExampleTextInput2">
        Text:
        <textarea
          className="addContainer"
          value={text}
          onChange={handleTextChange}
        />
      </label>
      <br />
      <button type="submit">Add</button>
    </form>
  ) : (
    <Signin />
  );
}
