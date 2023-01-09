import React from 'react'
import {BrowserRouter , Route,Routes} from 'react-router-dom'
import Register from './pages/Register.js'
import Login from './pages/Login.js'
import Chat from './pages/Chat.js'
import SetAvatar from './components/SetAvatar'
const App = () => {
  return <>
  <BrowserRouter>
     <Routes>
      <Route exact path='/register' element={<Register />} />
      <Route exact path='/' element={<Chat />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/setavatar' element={<SetAvatar />} />
     </Routes>
  </BrowserRouter>
  </>
}

export default App
