import React, { useState } from 'react'
import axiosInstance from '../axios/axiosInstanse'
import { Link } from 'react-router-dom'
import Form from '../post/Form'

function Login({ onLogin }) {
  const [showS, setShowS] = useState(false)
  const [form, setForm] = useState({ login: '', pwd: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await axiosInstance.get('/user')
      const found = res.data.user.find(
        (u) => u.login === form.login && u.pwd === form.pwd
      )

      if (found) {
        onLogin(found._id)
      } else {
        setError('Login yoki parol noto‘g‘ri')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Serverda xatolik')
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-90 bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Login</label>
            <input
              type="text"
              name="login"
              value={form.login}
              onChange={handleChange}
              placeholder="Enter your login"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="pwd"
              value={form.pwd}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 mt-1">{error}</p>
          )}
        </div>

        <div className="space-y-3">
          <button
            type="submit"
            className="w-full py-2 rounded-lg text-white font-semibold bg-indigo-600 hover:bg-indigo-700 transition"
          >
            Login
          </button>

          <div className="w-full py-2 rounded-lg font-semibold">
            <span>Don’t have an </span>
            <Link  className="text-indigo-600"   to={'/signup'}>account?</Link>
          </div>
        </div>
      </form>
      {
        showS && <Form setShowS={setShowS}/>
      }
    </div>
  )
}

export default Login
