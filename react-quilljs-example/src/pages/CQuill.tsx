import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import './CQuill.css'

export const CQuill = () => {
  const [value, setValue] = useState("");

  // Custom Fonts
  const Font = ReactQuill.Quill.import('formats/font');
  Font.whitelist = ['Ubuntu', 'Raleway', 'Roboto', 'Comic', 'Serif', 'Monospace', 'ArefRuqaa', 'Mirza', 'Arial', 'times-new-roman'];
  ReactQuill.Quill.register(Font, true);
  // Size Fonts
  const Size = ReactQuill.Quill.import('attributors/style/size');
  const fontSizeArr = ['8px', '9px', '10px', '11px', '12px', '14px', '18px', '24px', '30px', '36px', '48px', '60px', '72px', '96px'];
  Size.whitelist = fontSizeArr
  ReactQuill.Quill.register(Size, true);


  const modules = {
    toolbar: [
      [{ font: Font.whitelist }],
      [{ size: Size.whitelist }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      //["link", "image", "video"],
      ["clean"],
    ],
  };
  //console.log(value);

  return (
    <>
      <ReactQuill
        modules={modules}
        theme="snow"
        onChange={setValue}
        placeholder="El contenido comienza aquí..." />
    </>);

}