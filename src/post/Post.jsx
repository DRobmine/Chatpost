import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios/axiosInstanse'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Comments from '../get/Comments'

function Post({ userId }) {
  const { register, handleSubmit, reset } = useForm()
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const getUserData = async () => {
    try {
      const res = await axiosInstance.get(`/user/${userId}`)
      setUser(res.data.user)
    } catch (err) {
      console.error('Foydalanuvchi topilmadi:', err)
    }
  }

  useEffect(() => {
    if (userId) {
      getUserData()
    }
  }, [userId])

  const onSubmit = async (formData) => {
    const payload = { ...formData, userId }

    try {
      const res = await axiosInstance.post('/content', payload)
      setPostId(res.data.post._id)
      reset()
      navigate('/home')
    } catch (err) {
      console.error('Post xatoligi:', err)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative animate-fade-in">
        <Link to={'/home'} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
          ✖
        </Link>

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Post yaratish</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Rasm URL (ixtiyoriy)"
            {...register('content')}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Post matni..."
            {...register('contentText')}
            className="w-full border border-gray-300 p-3 rounded h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Yuborish
          </button>
        </form>
      </div>
    </div>
  )
}

export default Post
