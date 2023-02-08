import React, { useEffect, useState } from 'react';
import { getThemes } from '../../API/lessons';

export default function LessonsPage() {
  const [state, setState] = useState('');
  const [themesList, setThemesList] = useState(['']);

  useEffect(() => {
      setState('loading');
      getThemes()
      .then((res) => {
        setState('success');
        setThemesList(res);
      });
  }, []);

  return (
    <div className="main__container">
      <div className='lessons-content'>
        {state === 'loading' ? (
            <h1>Loading...</h1>
          ) : (
            <div className="theme-title">{themesList[0]}</div>
          )
        }
      </div>
    </div>
  );
}
