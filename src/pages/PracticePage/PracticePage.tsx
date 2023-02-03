// import React, { useEffect, useState } from 'react';

import CodeWarsChallenges from './components/CodeWarsChallenges';

export default function PracticePage() {
  // const [status, setStatus] = useState(false);

  // useEffect(() => {
  //   fetch('https://www.codewars.com/api/v1/users/elian-cheng/code-challenges/completed')
  //     .then((data) => data.json())
  //     .then(console.log);
  // }, [status]);
  return (
    <div className="main__container">
      <CodeWarsChallenges></CodeWarsChallenges>
    </div>
  );
}
