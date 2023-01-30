import { EditorProvider } from './editorComponents/EditorContext/EditorContext';
import { LangBar } from './editorComponents/LangBar/LangBar';
import { Preview } from './editorComponents/Preview/Preview';
function CodeEditor() {
  return (
    <EditorProvider>
      <article className="code-editor">
        <LangBar />
        <Preview />
      </article>
    </EditorProvider>
  );
}

export default CodeEditor;
