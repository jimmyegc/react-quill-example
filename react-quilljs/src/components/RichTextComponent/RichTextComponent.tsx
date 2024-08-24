import { useState } from "react";
import ReactQuill from "react-quill";
import { useRichText } from "./useRichText";
import "./RichTextComponent.css";

interface RichTextComponent {
  isPreview?: boolean;
  placeholder?: string;
  className?: string;
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
}: RichTextComponent) => {
  const [value, setValue] = useState("");
  const { quillRef, modules, noModules } = useRichText();

  return (
    <>      
      <div className="app">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        onChange={setValue}
        value={value}
        modules={isPreview ? noModules : modules}
        readOnly={isPreview}
        preserveWhitespace
        placeholder={placeholder}
        className={className}
        style={{ height: "400px" }}
      /></div>
    </>
  );
};
