import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme

import { useState } from "react";
export const New = () => {
  const [title, setTitle] = useState("");

  return (
    <>
      <h1>Nueva nota</h1>
      <form>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          placeholder="titulo"
          id="value"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editor"></div>
        <button>Enviar</button>
      </form>
    </>
  );
};
