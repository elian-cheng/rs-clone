import { useState } from 'react';
import CodeEditor from '../../components/CodeEditor/CodeEditor';
import CodeWarsChallenges from './components/CodeWars/CodeWarsChallenges';
import PracticeNavigation from './components/navigation/PracticeNavigation';

export default function PracticePage() {
  const [page, setPage] = useState('CodeWars');
  const codeEditorTaskObj = {
    html: `<h1>Hello World</h1>`,
    css: `h1{
      font-size: 40px;
    }`,
    ts: `document.querySelector('h1').style.color = '#D2863A';`,
  };
  return (
    <div className="main__container">
      <div className="practice__wrapper">
        <h1 className="practice__title title">Practice</h1>
        <PracticeNavigation setPage={setPage} page={page} />
        {page === 'CodeWars' ? <CodeWarsChallenges /> : <CodeEditor taskObj={codeEditorTaskObj} />}
      </div>
    </div>
  );
}
