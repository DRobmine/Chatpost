import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './get/Login'
import Post from './post/Post'
import Home from './components/Home'
import Form from './post/Form'
import Comments from './get/Comments'

function App() {
  const [userId, setUserId] = useState(() => localStorage.getItem('userId') || null)
  const navigate = useNavigate()

  useEffect(() => {
    if(userId){
      navigate('/home')
    }
  },[userId, navigate])

  const handleLogin = (id) => {
    localStorage.setItem('userId', id)
    setUserId(id)
    navigate('/home')
  }

  const handleLogout = () => {
    localStorage.removeItem('userId')
    setUserId(null)
    navigate('/')
  }

  return (
    <>
      {!userId ? (
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Form onLogin={handleLogin} />} />
        </Routes>
      ) : (
        <>
          <Routes>
            <Route path="/home" element={<Home userId={userId} onLogout={handleLogout}/>} />
            <Route path="/post" element={<Post userId={userId}  />} />
            <Route path='/comment' element={<Comments userId={userId}/>}/>
          </Routes>
        </>
      )}
    </>
  )
}

export default App
