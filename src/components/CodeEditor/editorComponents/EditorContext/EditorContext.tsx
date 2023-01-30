import { createContext, useState } from 'react';
import React from 'react';

interface IEditor {
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

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [ts, setTs] = useState('');

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
