import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css'

export const Test = () => {
  const [content, setContent] = useState('');
  let FontAttributor = ReactQuill.Quill.import('attributors/class/font');
  FontAttributor.whitelist = ['Ubuntu', 'Raleway', 'Roboto', "Roboto", "arial", "Montserrat", "Times New Roman"];


  /*FontAttributor.whitelist = [
    'sofia',
    'slabo',
    'roboto',
    'inconsolata',
    'ubuntu',
  ];*/
  ReactQuill.Quill.register(FontAttributor, true);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }],
      ['code-block'],
      [{ font: FontAttributor.whitelist }],
    ],
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
    'code-block',
  ];

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  return <>
    <h2>Test</h2>
    <ReactQuill
      theme="bubble"
      value={content}
      onChange={handleEditorChange}
      modules={quillModules}
      formats={quillFormats}
      className="w-full h-[70%] mt-10 bg-white"
    />
    <hr />
  </>
}