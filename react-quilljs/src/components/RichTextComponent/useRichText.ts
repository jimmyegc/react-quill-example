import { useCallback, useRef } from "react";
// Quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuillResizeImage from 'quill-resize-image';
import uploadToCloudinary from "./upload";
const Quill = ReactQuill.Quill;

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

export const useRichText = () => {
  const quillRef = useRef<ReactQuill>(null);  
  const imageHandler = useCallback(() => {
    
    const createFileInput = () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      return input;
    };

    const handleFileChange = async (event) => {
      const file = event.target.files?.[0];
      if (file) {
        const url = await uploadToCloudinary(file);
        const quill = quillRef.current;
        if (quill) {
          const range = quill.getEditorSelection();
          if (range) {
            quill.getEditor().insertEmbed(range.index, "image", url);
          }
        }
      }
    };

    const input = createFileInput();
    input.addEventListener("change", handleFileChange);
    input.click();
  }, []);
  
  const modules = {
    toolbar: {
      container: [
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
      handlers: {
        image: imageHandler        
      }, 
    },
    resize: {
      locale: {         
        floatLeft: "izquierda",
        floatRight: "derecha",
        center: "centro",
        restore: "restaurar",
        altTip: "¡Mantenga presionada la tecla Alt para bloquear la relación!",
        inputTip: "¡Presione la tecla Enter para aplicar el cambio!"        
      },
    }, 
  }; 
  
  const noToolbar = {
    toolbar: false,
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
    noToolbar,
    formats
  }
}