
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { toolbar } from '../quill/toolbar'

export const New = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      title: title,
      content: JSON.stringify(quill?.getContents())
    }
    try {
      await fetch('http://localhost:3001/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  console.log(quill);    // undefined > Quill Object
  console.log(quillRef);
  return (
    <>
      <h1>Nueva nota</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          placeholder="titulo"
          id="value"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editor w-3/4">

          <div ref={quillRef} />

        </div>
        <button className='rounded-xl bg-blue-500 text-white py-2 px-6 m-2 hover:bg-blue-700'>Enviar</button>
      </form>
    </>
  );
};
