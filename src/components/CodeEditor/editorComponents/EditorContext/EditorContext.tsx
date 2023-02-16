import { createContext, useState } from 'react';
import React from 'react';
import { ITask } from '../../CodeEditor';
export interface IEditor {
  html: string;
  css: string;
  ts: string;
  setHtml: React.Dispatch<React.SetStateAction<string>>;
  setCss: React.Dispatch<React.SetStateAction<string>>;
  setTs: React.Dispatch<React.SetStateAction<string>>;
}

export const EditorContext = createContext<IEditor>({
  html: '',
  css: '',
  ts: '',
  setHtml: () => {},
  setCss: () => {},
  setTs: () => {},
});

export const EditorProvider = ({ children, task }: { children: React.ReactNode; task: ITask }) => {
  const [html, setHtml] = useState(task.html);
  const [css, setCss] = useState(task.css);
  const [ts, setTs] = useState(task.ts);

  const values = {
    html,
    css,
    ts,
    setHtml,
    setCss,
    setTs,
  };

  return <EditorContext.Provider value={values}>{children}</EditorContext.Provider>;
};
