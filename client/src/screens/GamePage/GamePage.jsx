import React from 'react';

import { Keyboard, Portal, Typing } from '../../components';

export function GamePage() {
  return (
    <div>
      <Portal />
      <Typing />
      <Keyboard />
    </div>
  );
}
