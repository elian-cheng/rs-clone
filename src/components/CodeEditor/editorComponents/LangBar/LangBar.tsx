import { useState } from 'react';
import TsEditor from '../TsEditor';
import CssEditor from '../CssEditor';
import HtmlEditor from '../HtmlEditor';

export function LangBar() {
  const [activeTab, setActiveTab] = useState('ts');
  return (
    <div className="code-editor__configure">
      <nav className="code-editor__bar">
        <button
          className={`${'code-editor__btn'} ${activeTab === 'html' && 'active-btn'}`}
          onClick={() => setActiveTab('html')}
        >
          HTML
        </button>
        <button
          className={`${'code-editor__btn'} ${activeTab === 'css' && 'active-btn'}`}
          onClick={() => setActiveTab('css')}
        >
          CSS
        </button>
        <button
          className={`${'code-editor__btn'} ${activeTab === 'ts' && 'active-btn'}`}
          onClick={() => setActiveTab('ts')}
        >
          TS
        </button>
      </nav>
      <div className="code-editor__area">
        {activeTab === 'html' && <HtmlEditor />}
        {activeTab === 'css' && <CssEditor />}
        {activeTab === 'ts' && <TsEditor />}
      </div>
    </div>
  );
}
