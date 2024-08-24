import { useRef } from "react";
// Quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuillResizeImage from 'quill-resize-image';
const Quill = ReactQuill.Quill;

export const useRichText = () => {
  const quillRef = useRef(null);

  // Custom Fonts
  const Font = Quill.import("formats/font");
  const fontFamilies = [
    "Ubuntu",
    "Raleway",
    "Roboto",
    "Comic",
    "Monospace",
    "ArefRuqaa",
    "Mirza",
    "Arial",
    "times-new-roman",
    "open-sans",
  ];
  Font.whitelist = fontFamilies
  Quill.register(Font, true);  
  // Custom Sizes
  const Size = Quill.import("attributors/style/size");
  const fontSizeArr = [
    "8px",
    "9px",
    "10px",
    "11px",
    "12px",
    "14px",
    "18px",
    "24px",
    "30px",
    "36px",
    "48px",
    "60px",
    "72px",
    "96px",
  ];
  Size.whitelist = fontSizeArr;
  Quill.register(Size, true);
  // Resize Image
  Quill.register("modules/resize", QuillResizeImage);

  const noModules = {
    toolbar: false,
  }; 

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: fontFamilies.sort() }],
      [{ size: fontSizeArr }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      ["link", "image"],
      ["clean"],
    ],
    resize: {
      locale: {},
    },
  }; 

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return {
    quillRef,
    modules,
    noModules,
    formats
  }
}