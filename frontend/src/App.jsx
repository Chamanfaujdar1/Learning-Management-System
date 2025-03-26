
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import Signup from './pages/Signup'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import Login from './pages/Login'

function App() {

  return (
    <>

    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path='/signup' element={<Signup/>}/>
      <Route path="/about" element={<AboutUs/>}/> 
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/login" element={<Login/>}/>








      <Route path='*' element={<NotFound/>}/>
    </Routes>

    </>
  )
}

export default App
