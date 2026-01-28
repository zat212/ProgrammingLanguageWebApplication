import { useState } from 'react'


import './App.css'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <>
    <Navbar/>
    <Sidebar/>
    <div className='ml-70 mt-20'>
      <Outlet/>
    </div>
    </>

  )
}

export default App
