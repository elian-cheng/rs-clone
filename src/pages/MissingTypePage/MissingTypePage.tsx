import React, { useState } from 'react';
import MissingTypeStartPage from './components/MissingTypeStartPage/MissingTypeStartPage';
import MissingTypeTask from './components/MissingTypeTask';

export default function MissingTypePage() {
  const [startStatus, setStartStatus] = useState(false);
  return (
    <article className="missing-type">
      {startStatus ? <MissingTypeTask /> : <MissingTypeStartPage setStartStatus={setStartStatus} />}
    </article>
  );
}
