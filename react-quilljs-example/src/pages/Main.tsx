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
    <>
      <h1>Lista de notas</h1>
      <ul>
        {
          notes.map((note) => (
            <li key={note._id}>
              <Link to={`/${note._id}`}>{note.title}</Link>
            </li>
          ))
        }
      </ul>
      <Link to="/new" className="mt-1">Nueva Nota</Link>
    </>
  )
}


