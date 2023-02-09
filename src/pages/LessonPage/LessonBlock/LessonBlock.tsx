import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import CodeEditor from '../../../components/CodeEditor/CodeEditor';
import Theory, { ILesson } from '../Theory/Theory';

export default function LessonBlock({
  lesson,
  setLessonId,
}: {
  lesson: ILesson;
  setLessonId: Dispatch<SetStateAction<string>>;
}) {
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
        <CodeEditor taskObj={codeEditorTaskObj} />
      </section>
      <nav className="lesson__controls">
        <Link
          to={`/lessons/${urlId - 1}`}
          onClick={() => setLessonId(`${+lesson.id - 1}`)}
          className="lesson__controls-btn"
        >
          Previous
        </Link>
        <Link
          to={`/lessons/${urlId + 1}`}
          onClick={() => setLessonId(`${+lesson.id + 1}`)}
          className="lesson__controls-btn"
        >
          Next
        </Link>
      </nav>
    </article>
  );
}
