import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import { useContext } from 'react';
import { EditorContext } from './EditorContext/EditorContext';

export default function HtmlEditor() {
  const { html, setHtml } = useContext(EditorContext);
  return (
    <AceEditor
      placeholder="Write your HTML here"
      mode="html"
      theme="monokai"
      name="editor_html"
      defaultValue={html}
      value={html}
      onChange={(value) => setHtml(value)}
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
