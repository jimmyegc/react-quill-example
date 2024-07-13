
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { toolbar } from '../quill/toolbar'

export const Edit = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [title, setTitle] = useState("");
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar
    }
  });


  useEffect(() => {
    const getNote = async () => {
      const response = await fetch(`http://localhost:3001/${params.id}`)
      const note = await response.json()
      quill?.setContents(JSON.parse(note.content))
      setTitle(note.title)
    }
    if (quill) {
      getNote()
    }
  }, [params.id, quill])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      title: title,
      content: JSON.stringify(quill?.getContents())
    }
    try {
      await fetch(`http://localhost:3001/${params.id}`, {
        method: 'PUT',
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

  return (
    <>
      <h1>Editar nota</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Título:</label>
        <input type='text' placeholder='titulo' id='value'
          value={title}
          onChange={(e) => setTitle(e.target.value)} />
        <div className='editor w-3/4'>
          <div ref={quillRef}>
          </div>
        </div>
        <button>Enviar</button>
      </form>
    </>
  )
}
