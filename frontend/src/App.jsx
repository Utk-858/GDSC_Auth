import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ViewProjects from './ViewProjects'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Dashboard from './dashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/viewProjects' element={<ViewProjects/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
