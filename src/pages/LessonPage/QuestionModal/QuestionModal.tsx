import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserId } from '../../../API/authorization';
import { getUserStatistics, setUserStatistics } from '../../../API/statistics';
import { getLessons } from '../../../API/tasks';
import storage from '../../../utils/storage';
import { ILesson } from '../Theory/Theory';

export default function QuestionModal({
  setShowModal,
  setLessonId,
  lesson,
  urlId,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setLessonId: Dispatch<SetStateAction<string>>;
  lesson: ILesson;
  urlId: number;
}) {
  const [answer, setAnswer] = useState('');
  const [answerStatus, setAnswerStatus] = useState(false);
  const [allLessons, setAllLessons] = useState<ILesson[] | undefined>(undefined);

  async function updateLessonStatistic() {
    const user = storage.getItem('userData');
    if (!user) return;
    const statisticObj = await getUserStatistics(getUserId());
    const lessonsCompletedArr: string[] = statisticObj.data.lessons?.lessonsId
      ? JSON.parse(statisticObj.data.lessons?.lessonsId)
      : [];
    lessonsCompletedArr.includes(lesson.id.toString())
      ? null
      : lessonsCompletedArr.push(lesson.id.toString());
    if (
      statisticObj.data.lessons &&
      (statisticObj.data.lessons.learnedLessons || statisticObj.data.lessons.learnedLessons === 0)
    ) {
      statisticObj.data.lessons.lessonsId = JSON.stringify(lessonsCompletedArr);
      statisticObj.data.lessons.learnedLessons = lessonsCompletedArr.length;
    }
    delete statisticObj.data.id;
    setUserStatistics(getUserId(), statisticObj.data);
  }

  useEffect(() => {
    if (answer === lesson.answer) {
      setShowModal(false);
      updateLessonStatistic();
    }
  }, [answer]);

  useEffect(() => {
    getLessons().then((res: ILesson[]) => setAllLessons(res));
  }, []);

  let nextLesson: ILesson | undefined;
  if (allLessons) {
    nextLesson = allLessons.find((item) => +item.id === urlId + 1);
  }

  return (
    <div className="lesson__question">
      <div className="lesson__question-window">
        <span className="lesson__question-window-close" onClick={() => setShowModal(false)}>
          ✖
        </span>
        <p className="lesson__question-window-question">{lesson.question}</p>
        <ul className="lesson__question-window-list">
          {lesson.options.map((item, i) => {
            if (item !== lesson.answer) {
              return (
                <li
                  className="lesson__question-window-list-item"
                  key={i}
                  onClick={() => {
                    setAnswer(item);
                    setAnswerStatus(true);
                  }}
                >
                  <Link to={`/lessons/${urlId}`}>{item}</Link>
                </li>
              );
            } else {
              return (
                <li
                  className="lesson__question-window-list-item"
                  key={i}
                  onClick={() => setAnswer(item)}
                >
                  <Link
                    to={nextLesson ? `/lessons/${urlId + 1}` : `/practice`}
                    onClick={() => setLessonId(`${+lesson.id + 1}`)}
                  >
                    {item}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
        <div className="lesson__question-window-answer-status">
          {answerStatus && 'Wrong answer'}
        </div>
      </div>
    </div>
  );
}
