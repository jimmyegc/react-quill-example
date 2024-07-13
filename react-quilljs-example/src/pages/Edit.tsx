
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { toolbar } from '../quill/toolbar'

export const Edit = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [title, setTitle] = useState("");

  const quillImageCallback = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      let data = null;
      const formData = new FormData();

      const quillObj = quillRef?.current?.getEditor();
      const range = quillObj?.getSelection();

      if (file) {
        formData.append('file', file);
        formData.append('resource_type', 'raw');

        const responseUpload = await fetch(
          `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD}/upload`,
          { method: 'POST', body: formData }
        );

        data = await responseUpload.json();
        if (data.error) {
          console.error(data.error);
        }

        quillObj.editor.insertEmbed(range.index, 'image', data?.secure_url);
      }
    };
  };

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar,
      handlers: {
        image: quillImageCallback
      }
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
