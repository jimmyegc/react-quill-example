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

  const getNote = async () => {
    const response = await fetch(`http://localhost:3001/${params.id}`)
    const note = await response.json()
    quill?.setContents(JSON.parse(note.content))
    setTitle(note.title)
  }

  useEffect(() => {

    if (quill) {
      getNote()
    }
  }, [params.id, quill])

  return (
    <div className="w-3/4">
      <h1 className="text-xl text-center font-semibold">Ver nota</h1>
      <p className="text-center text-lg">{title}</p>
      <div className="w-3/4 mx-auto ">
        <article ref={quillRef}></article>
      </div>
      <Link to={`/${params.id}/edit`}
        className="inline-block bg-blue-500 text-white py-2 px-6 m-2 hover:bg-blue-700"
      >Editar</Link>

    </div>
  )
}