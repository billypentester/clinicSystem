import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

import Patient from './pages/Patient'
import Doctor from './pages/Doctor'

function App() {
  return (
    <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/:role/register' element={<Register />} />
      <Route path='/:role/login' element={<Login />} />
      <Route path='/patient/dashboard/' element={<Patient />} />
      <Route path='/doctor/dashboard/' element={<Doctor />} />
    </Routes>
  )
}

export default App
