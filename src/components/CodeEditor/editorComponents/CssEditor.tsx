import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import { EditorContext } from './EditorContext/EditorContext';
import { useContext } from 'react';

export default function CssEditor() {
  const { css, setCss } = useContext(EditorContext);
  return (
    <AceEditor
      placeholder="Write your CSS here"
      mode="css"
      theme="monokai"
      name="editor_css"
      value={css}
      onChange={(value) => setCss(value)}
      fontSize={20}
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
