
import './App.css'
import Navbar from './components/navbar/Navbar'
import Dashboard from './components/Dashboard'
import CreateStudy from './components/study/CreateStudy'
import { Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'

function App() {
  const [studies, setStudies] = useState([])


  return (
    <>
    
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Dashboard studies={studies}/>}/>
        {/* <Route path='/subject' element = {<Subject/>}/>
        <Route path='/dietplan' element = {<DietPlan/>}/> */}
        <Route path='/createstudy' element = {<CreateStudy studies= {studies} setStudies={setStudies}/>}/>
      </Routes>

      
    
    </>
  )
}

export default App
