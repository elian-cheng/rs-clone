import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/webpack-resolver';
import { EditorContext } from './EditorContext/EditorContext';
import { useContext } from 'react';

export default function TsEditor() {
  const { ts, setTs } = useContext(EditorContext);
  return (
    <AceEditor
      placeholder="Write your TS here"
      mode="javascript"
      theme="monokai"
      name="editor_js"
      defaultValue={ts}
      value={ts}
      onChange={(value) => setTs(value)}
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
