//import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Main } from './pages/Main'
import { View } from './pages/View'
import { Edit } from './pages/Edit'
import { New } from './pages/New'
import { Test } from './pages/Test'
import { CQuill } from './pages/CQuill'
import { QuillJs } from './pages/QuillJs'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<View />} />
          <Route path="/:id/edit" element={<Edit />} />
          <Route path="/new" element={<New />} />
        </Routes>
      </BrowserRouter>
      {/* <Test /> */}
      {/* <CQuill /> */}
      <QuillJs />
    </>
  )
}

export default App
