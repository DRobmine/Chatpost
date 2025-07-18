import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios/axiosInstanse'
import User from './get/User'
import { Link } from 'react-router-dom'

function Userpost({ userId }) {
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      if (!selectedUserId) return
      const res = await axiosInstance.get('/content')
      const filtered = res.data.post.filter((p) => p.author === selectedUserId)
      setPosts(filtered)
    }

    fetchPosts()
  }, [selectedUserId])

  return (
    <>
    <div className="flex">
      <User userId={userId} onSelectUser={setSelectedUserId} />
      <div className="flex-1 p-6">
        {selectedUserId ? (
          <>
            <h2 className="text-xl font-bold mb-4">Foydalanuvchining postlari</h2>
            {posts.length > 0 ? (
              <ul className="space-y-4">
                {posts.map((post) => (
                  <li key={post._id} className="border p-4 rounded shadow-sm">
                    <h3 className="text-lg font-semibold">{post.content}</h3>
                    <p className="text-gray-700">{post.contentText}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Postlar topilmadi.</p>
            )}
          </>
        ) : (
          <p></p>
        )}
      </div>
    </div>
          </>
  )
}

export default Userpost
