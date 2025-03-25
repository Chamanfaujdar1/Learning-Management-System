
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import Signup from './pages/Signup'

function App() {

  return (
    <>

    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path='/signup' element={<Signup/>}/>











      <Route path='*' element={<NotFound/>}/>
    </Routes>

    </>
  )
}

export default App
