import { useContext } from 'react';
import { EditorContext } from '../EditorContext/EditorContext';

export function Preview() {
  const { html, css, ts } = useContext(EditorContext);
  const layot = () => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>${css}</style>
      <title>Document</title>
    </head>
    <body>
      ${html}
      <script>
      ${ts}
      </script>
    </body>
    </html>`;
  };

  return <iframe srcDoc={layot()} title="preview" className="code-editor__preview"></iframe>;
}
