import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllLessons } from '../../API/lessons';

export default function LessonsPage() {
  const [state, setState] = useState('');
  const [allLessonsList, setAllLessonsList] = useState([{id:'id', title:'title', theme:'theme'}]);
  const [themesList, setThemesList] = useState(['']);
  let themesSet:string[] = [];

  useEffect(() => {
      setState('loading');
      getAllLessons()
      .then((res) => {
        res.forEach(item => {
          themesSet.push(item.theme);
        })
        themesSet = Array.from(new Set(themesSet));
        setThemesList(themesSet);
        setAllLessonsList(res);
        setState('success');
      });
  }, []);

  const lessonsAction = (event: MouseEvent) => {
    const themeBtn = (event.target as HTMLElement).closest('.lessons__theme-block');
    if (themeBtn) {
      themeBtn.classList.toggle('lessons__theme-block_open');
    }
  };

  useEffect(() => {
    addEventListener('click', lessonsAction);
    return () => {
      removeEventListener('click', lessonsAction);
    };
  }, []);

  return (
    <div className="main__container">
      <div className='lessons-content'>
        {state === 'loading' ? (
            <h1>Loading...</h1>
          ) : (
            <div className="lessons__themes">
              {themesList.map((item,i) => {
                return (
                  <div className="lessons__theme-block" key={i}>
                    <div className="theme-block__title">{item}</div>
                    {allLessonsList.map((el,j) => {
                      if (el.theme !== item) return;
                      return (
                        <Link to={`/lessons/${el.id}`} className="theme-block__lesson" key={j}>{el.id}. {el.title}</Link>
                      )
                    })}
                  </div>
                );
              })}
            </div>
          )
        }
      </div>
    </div>
  );
}
