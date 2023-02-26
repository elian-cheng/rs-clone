import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllLessons } from '../../API/lessons';
import { ReactComponent as Arrow } from '../../assets/icons/sidebar/arrowleft.svg';

export default function LessonsPage() {
  const [state, setState] = useState('');
  const [allLessonsList, setAllLessonsList] = useState([
    { id: 'id', title: 'title', theme: 'theme' },
  ]);
  const [themesList, setThemesList] = useState(['']);
  let themesSet: string[] = [];

  useEffect(() => {
    setState('loading');
    getAllLessons().then((res) => {
      res.forEach((item) => {
        themesSet.push(item.theme);
      });
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
      themeBtn.firstElementChild?.firstElementChild?.classList.toggle('theme-block__arrow_open');
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
      <div className="lessons__wrapper">
        <h1 className="lessons__title title">Lessons</h1>
        <div className="lessons-content">
          {state === 'loading' ? (
            <h2>Loading...</h2>
          ) : (
            <div className="lessons__themes">
              {themesList.map((item, i) => {
                return (
                  <div className="lessons__theme-block" key={i}>
                    <div
                      className="theme-block__title"
                    >{item}<Arrow className='theme-block__arrow' /></div>
                    {allLessonsList.map((el, j) => {
                      if (el.theme !== item) return;
                      return (
                        <Link to={`/lessons/${el.id}`} className="theme-block__lesson" key={j}>
                          {el.id}. {el.title}
                        </Link>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
