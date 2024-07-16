import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Main = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const getNotes = async () => {
      const response = await fetch('http://localhost:3001/')
      const data = await response.json()
      setNotes(data)
    }
    getNotes()
  }, [])
  return (
    <div className="">
      <h1 className="text-xl text-center font-semibold">Lista de notas</h1>
      <ul className="">
        {
          notes.map((note) => (
            <li key={note._id}
              className="border-2 border-gray-700 mb-4 max-w-80 px-2 py-8"
            >
              <Link to={`/${note._id}`}>{note.title}</Link>
            </li>
          ))
        }
      </ul>

      <Link to="/new"
        className="inline-block bg-blue-500 text-white py-2 px-6 m-2 hover:bg-blue-700">Nueva Nota</Link>
    </div>
  )
}


