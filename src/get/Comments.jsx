import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios/axiosInstanse'
import { useForm } from 'react-hook-form'
import Comment from '../post/Comment'

function Comments({ userId, postId, setShowC }) {
  const { register, handleSubmit, reset } = useForm()
  const [user, setUser] = useState(null)

  const getUserData = async () => {
    try {
      const res = await axiosInstance.get(`/user/${userId}`)
      setUser(res.data.user)
    } catch (err) {
      console.error('Foydalanuvchi topilmadi:', err)
    }
  }

  useEffect(() => {
    if (userId) getUserData()
  }, [userId])

  const onSubmit = async (formData) => {
    const payload = {
      text: formData.text,
      userId,
      postId
    }

    try {
      await axiosInstance.post('/comment', payload)
      reset()
    } catch (err) {
      console.error('Komment yuborishda xatolik:', err)
    }
  }

  return (
    <>
    <button className='fixed z-40 right-5 top-5' onClick={() => setShowC(false)}><img src="" alt="" /> dajndan</button>
      <Comment postId={postId} />
      <div className="fixed bottom-0 w-full bg-white shadow-lg p-4 z-30">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-w-xl mx-auto gap-2"
        >
          <input
            type="text"
            {...register('text')}
            placeholder="Komment yozing..."
            className="flex-1 px-4 py-2 border rounded-md shadow-sm outline-none focus:ring focus:border-blue-400"
            required
          />
        </form>
      </div>
    </>
  )
}

export default Comments
