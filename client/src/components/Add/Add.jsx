import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Add() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const userID = useSelector((state) => state.user.userId);
  console.log('🚀  userID==>', userID);
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

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      <br />
      <label>
        Text:
        <textarea value={text} onChange={handleTextChange} />
      </label>
      <br />
      <button type="submit">Add</button>
    </form>
  );
}
