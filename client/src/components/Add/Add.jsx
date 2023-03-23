/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useSelector } from 'react-redux';
import { Signin } from '../Signin/Signin';

import './Add.css';

export default function Add() {
  const isAuth = useSelector((store) => store.isAuth);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const userID = useSelector((state) => state?.user?.userId);
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
      .then((response) => response.json());
    setTitle('');
    setText('');
  };

  return isAuth ? (
    <div id="wrapper">
      <form
        onSubmit={handleSubmit}
        className="paper"
      >
        <label
          htmlFor="ExampleTitleInput"
          id="margin"
        >
          Title:
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            id="title"
            className="title"
          />
        </label>
        <br />

        <TextareaAutosize
          value={text}
          onChange={handleTextChange}
          id="text"
          className="text"
          rows={4}
        />
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  ) : (
    <Signin />
  );
}
