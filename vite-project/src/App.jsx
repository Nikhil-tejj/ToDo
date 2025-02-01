import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/Home' 
import AddTask from './pages/AddTask'
import TaskList from './pages/TaskList'

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/add' element={<AddTask/>}></Route>
          <Route path='/all' element={<TaskList/>}></Route>
        </Routes>
      </Router>
  )
}

export default App
