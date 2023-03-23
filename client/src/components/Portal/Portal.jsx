import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Popup } from '../Popup/Popup';

export function Portal() {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div>
      {showPopup && createPortal(
        <Popup className="portal" onClose={() => setShowPopup()} />,
        document.body,
      )}
    </div>
  );
}
