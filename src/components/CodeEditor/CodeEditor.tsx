import { EditorProvider } from './editorComponents/EditorContext/EditorContext';
import { LangBar } from './editorComponents/LangBar/LangBar';
import { Preview } from './editorComponents/Preview/Preview';
export interface ITask {
  html: string;
  css: string;
  ts: string;
}
function CodeEditor({ taskObj }: { taskObj: ITask }) {
  return (
    <EditorProvider task={taskObj}>
      <article className="code-editor">
        <LangBar />
        <Preview />
      </article>
    </EditorProvider>
  );
}

export default CodeEditor;
