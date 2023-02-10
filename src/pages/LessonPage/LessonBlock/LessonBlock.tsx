import { Dispatch, SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import CodeEditor from '../../../components/CodeEditor/CodeEditor';
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
  const codeEditorTaskObj = {
    html: `<h1>Hello World</h1>`,
    css: `h1{
      font-size: 40px;
    }`,
    ts: `document.querySelector('h1').style.color = '#D2863A';`,
  };
  const urlId = +lesson.id;
  return (
    <article className="lesson__content">
      <section className="lesson__block">
        <Theory lesson={lesson ? lesson : null} />
        <div className="lesson__code">
          <CodeEditor taskObj={codeEditorTaskObj} />
        </div>
      </section>
      <nav className="lesson__controls">
        {urlId > 1 ? (
          <button className="lesson__controls-btn">
            <Link to={`/lessons/${urlId - 1}`} onClick={() => setLessonId(`${+lesson.id - 1}`)}>
              Previous
            </Link>
          </button>
        ) : (
          <div></div>
        )}
        <button className="lesson__controls-btn" onClick={() => setShowModal(true)}>
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
