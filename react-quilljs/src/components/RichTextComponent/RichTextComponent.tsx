import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useRichText } from "./useRichText";
import "./RichTextComponent.css";
import { useSearchDebounce } from "./useSearchDebounce";

interface RichTextComponent {
  isPreview?: boolean;
  placeholder?: string;
  className?: string;
  data?: string;
  title?: string;
}

/**
 * Fecha: 23/08/2024
 * Creado por: Jimmy García
 * Contexto:
 * Se utilizó la librería react-quill : https://www.npmjs.com/package/react-quill
 * para cubrir la necesidad de un editor de texto que permitiera guardar texto e imagenes.
 *
 * @param {boolean} isPreview - Modo de edición y vista preeliminar.
 * @param {string} placeholder - Texto por defecto como ayuda para el usuario.
 * @param {string} className - Clase para poder personalizar el contenedor.
 *
 */
export const RichTextComponent = ({  
  isPreview,
  placeholder,
  className,
  data,
  title,
}: RichTextComponent) => {
  console.log(data)
  const { quillRef, modules, formats, noToolbar } = useRichText();

  const [isLoaded, setIsLoaded] = useState(false);
  const [value, setValue] = useState<any>();
  const [search, setSearch] = useSearchDebounce();

  const handleChange = () => {
    if(isLoaded && quillRef.current) {
      if(quillRef.current != null){
        setValue(quillRef?.current.getEditor().getContents());
        setSearch(quillRef?.current.getEditor().getContents());
      }
    }
  };

  const handleLoad = () => {
    const data = localStorage.getItem("data")
    if (!isLoaded && data != undefined) {
      setValue(JSON.parse(data));
      if(quillRef.current) quillRef?.current.getEditor().setContents(JSON.parse(data));
    }
    setIsLoaded(true);
  }

  const handleSave = () => {
    if(quillRef.current !=undefined) {
      const richtextContent = quillRef?.current.getEditor().getContents();
      console.log(richtextContent)
      localStorage.setItem("data", JSON.stringify(richtextContent))
   }
  }

  useEffect(() => {
    if (search != null && isLoaded) {
      if(quillRef.current) handleSave();
    }
  }, [search]);
  
  useEffect(() => {    
    handleLoad();
  }, []);

  console.log(value)

  return (
    <>      
      <b>{title}</b>
      <div className="app">                      
        <ReactQuill
          ref={quillRef}
          theme="snow"
          onChange={handleChange}
          value={value}
          modules={isPreview ? noToolbar : modules}             
          formats={formats}      
          readOnly={isPreview}
          preserveWhitespace
          placeholder={placeholder}
          className={className}
          style={{ height: "100vh" }}
        />     
      </div>
      <button onClick={handleLoad}>Load</button>
      <button onClick={handleSave}>Save</button>
      <pre>
      {JSON.stringify(value,null,2)}
      </pre>
    </>
  );
};
