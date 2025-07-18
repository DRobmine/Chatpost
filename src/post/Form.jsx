import React from 'react'
import { useForm } from 'react-hook-form'
import axiosInstance from '../axios/axiosInstanse'
import { Link } from 'react-router-dom'

function Form({ setShowS, onLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
      const res = await axiosInstance.post('/user', data)
      const newUser = res.data.user

      if (newUser && newUser._id) {
        onLogin(newUser._id)
        reset()
      } else {
        console.error('User ID not returned after signup')
      }
  }

  return (
    <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-90 bg-white rounded-2xl shadow-2xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign up</h2>
        <div className="space-y-3">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Login</label>
            <input
              {...register('login', {
                required: true,
                minLength: { value: 4, message: 'Min 4 characters' },
                maxLength: { value: 12, message: 'Max 12 characters' },
              })}
              type="text"
              placeholder="Enter your Login"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.login
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-indigo-400'
              }`}
            />
            {errors.login && (
              <p className="text-xs text-red-500 mt-1">{errors.login.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Create password</label>
            <input
              {...register('pwd', {
                required: 'Required',
                minLength: { value: 8, message: 'Min 8 characters' },
                maxLength: { value: 12, message: 'Max 12 characters' },
              })}
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.pwd
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-indigo-400'
              }`}
            />
            {errors.pwd && (
              <p className="text-xs text-red-500 mt-1">{errors.pwd.message}</p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg text-white font-semibold bg-indigo-600 hover:bg-indigo-700 transition"
          >
            Sign up
          </button>
          <div className="w-full py-2 rounded-lg font-semibold">
            <span>Already have an </span>
            <Link className="text-indigo-600" to={'/'}>account</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Form
