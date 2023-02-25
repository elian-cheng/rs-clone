import React, { useEffect, useState } from 'react';
import { getLesson } from '../../API/tasks';
import ErrorPage from '../ErrorPage/ErrorPage';
import LessonBlock from './LessonBlock/LessonBlock';

export default function LessonPage() {
  const url = window.location.href;

  const [lesson, setLesson] = useState();
  const [lessonId, setLessonId] = useState(url.split('/').reverse()[0]);

  useEffect(() => {
    getLesson(lessonId).then((res: React.SetStateAction<undefined>) => setLesson(res));
  }, [lessonId]);

  const upScroll = (event: MouseEvent) => {
    const navBtn = (event.target as HTMLElement).closest('.lesson__controls-btn');
    const optionBtn = (event.target as HTMLElement).closest('.lesson__question-window-list-item');
    if (navBtn || optionBtn) {
      window.scrollTo(0,0)
    }
  };

  useEffect(() => {
    addEventListener('click', upScroll);
    return () => {
      removeEventListener('click', upScroll);
    };
  }, []);

  return (
    <div className="main__container">
      <div className="lessons__wrapper">
        <div className="lesson">
          {lesson ? <LessonBlock lesson={lesson} setLessonId={setLessonId} /> : <h2>Loading...</h2>}
        </div>
      </div>
    </div>
  );
}
