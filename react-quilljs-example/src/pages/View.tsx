import { useParams, Link } from "react-router-dom"
import { useQuill } from "react-quilljs"
import { useEffect, useState } from "react"

export const View = () => {
  const params = useParams()
  const [title, setTitle] = useState('')
  const { quill, quillRef } = useQuill({
    readOnly: true,
    modules: {
      toolbar: false
    }
  })

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

  return (
    <>
      <h1>Ver nota</h1>
      <p>{title}</p>
      <div className="w-3/4">
        <article ref={quillRef}></article>
      </div>
      <Link to={`/${params.id}/edit`}>Editar</Link>
    </>
  )
}