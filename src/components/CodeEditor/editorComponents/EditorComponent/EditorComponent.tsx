import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import { Dispatch, SetStateAction, useContext } from 'react';
import { EditorContext } from '../EditorContext/EditorContext';

export default function EditorComponent({ lang }: { lang: string }) {
  const langObj = useContext(EditorContext);
  let setLangFunc: Dispatch<SetStateAction<string>>;
  let langText: string;

  switch (lang) {
    case 'html':
      setLangFunc = langObj.setHtml;
      langText = langObj.html;
      break;
    case 'css':
      setLangFunc = langObj.setCss;
      langText = langObj.css;
      break;
    case 'ts':
      setLangFunc = langObj.setTs;
      langText = langObj.ts;
      break;
    default:
      setLangFunc = langObj.setHtml;
      langText = langObj.html;
  }
  return (
    <AceEditor
      placeholder="Write your CSS here"
      mode={lang}
      theme="monokai"
      name={`Editor ${lang}`}
      defaultValue={langText}
      value={langText}
      onChange={(value) => setLangFunc(value)}
      fontSize={16}
      height="100%"
      width="100%"
      showPrintMargin={false}
      showGutter={true}
      highlightActiveLine={true}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
        useWorker: false,
      }}
    />
  );
}
