import React from 'react';

import { Keyboard, Portal, Typing } from '../../components';
import './GamePage.css';

export function GamePage() {
  return (
    <div className="mainconteiner">
      <Portal />
      <Typing showButton />
      <Keyboard />
    </div>
  );
}
