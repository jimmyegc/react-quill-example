import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; // Add css for snow theme
import { useEffect } from 'react';
import './QuillJs.scss'

export const QuillJs = () => {
  const { quill, quillRef } = useQuill(
    {
      modules: {
        toolbar: '#toolbar'
      },
      formats: ["size", "bold", "script"], // Important
    }
  );

  console.log(quill);    // undefined > Quill Object
  console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        console.log('Text change!');
        console.log(quill.getText()); // Get text only
        console.log(quill.getContents()); // Get delta contents
        console.log(quill.root.innerHTML); // Get innerHTML using quill
        console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [quill]);

  return (<>
    <h2>QuillJs</h2>
    <div style={{ width: '100%', height: 300 }}>
      <div ref={quillRef} />
      <div id="toolbar">
        <select className="ql-font">
          <option value="roboto">Roboto</option>
          <option value="Arial">Arial</option>
          <option value="sans-serif">Sans Serif</option>
          <option value="Georgia, serif">Serif</option>
          <option id="normalFont" value="Monaco, 'Courier New', monospace" selected>Monospace</option>
        </select>
        <select className="ql-size">
          <option value="small" />
          <option selected />
          <option value="large" />
          <option value="huge" />
        </select>
        <button className="ql-bold" />
        <button className="ql-script" value="sub" />
        <button className="ql-script" value="super" />
      </div>
      <div id="editor" />
    </div>
  </>)
}