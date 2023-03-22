/* eslint-disable react/prop-types */
import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import ProgressBar from '@ramonak/react-progress-bar';

export function Bar({ percentOfLose }) {
  const percent = Math.round(
    (percentOfLose.counter_state / percentOfLose.counter_end) * 100,
  );

  return <ProgressBar completed={percent} width={300} customLabel="  " bgColor="#fbeee0" baseBgColor="#422800" labelColor />;
}
