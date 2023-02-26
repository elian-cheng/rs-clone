import { Dispatch, SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import QuestionModal from '../QuestionModal/QuestionModal';
import Theory, { ILesson } from '../Theory/Theory';

export default function LessonBlock({
  lesson,
  setLessonId,
}: {
  lesson: ILesson;
  setLessonId: Dispatch<SetStateAction<string>>;
}) {
  const [showModal, setShowModal] = useState(false);
  const urlId = +lesson.id;
  return (
    <article className="lesson__content">
      <section className="lesson__block">
        <Theory lesson={lesson ? lesson : null} />
      </section>
      <nav className="lesson__controls">
        {urlId > 1 ? (
          <button className="button">
            <Link to={`/lessons/${urlId - 1}`} onClick={() => setLessonId(`${+lesson.id - 1}`)}>
              Previous
            </Link>
          </button>
        ) : (
          <div></div>
        )}
        <button className="button" onClick={() => setShowModal(true)}>
          Next
        </button>
        {showModal ? (
          <QuestionModal
            setShowModal={setShowModal}
            lesson={lesson}
            setLessonId={setLessonId}
            urlId={urlId}
          />
        ) : null}
      </nav>
    </article>
  );
}
