import { Dispatch, SetStateAction } from 'react';

export default function PracticeNavigation({
  setPage,
  page,
}: {
  setPage: Dispatch<SetStateAction<string>>;
  page: string;
}) {
  return (
    <nav className="practice__navigation">
      <button
        className={`${'practice__navigation-code-wars'} ${page === 'CodeWars' && 'active-btn'}`}
        onClick={() => setPage('CodeWars')}
      >
        CodeWars
      </button>
      <button
        className={`${'practice__navigation-code-editor'} ${page === 'CodeEditor' && 'active-btn'}`}
        onClick={() => setPage('CodeEditor')}
      >
        CodeEditor
      </button>
    </nav>
  );
}
