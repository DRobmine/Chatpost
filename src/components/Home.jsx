import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios/axiosInstanse'
import { Link, useNavigate } from 'react-router-dom'
import Comments from '../get/Comments'
import Comment from '../post/Comment'

function Home({ userId, onLogout }) {
  const [posts, setPosts] = useState([])
  const [userMap, setUserMap] = useState({})
  const [selectedId, setSelectedId] = useState(null)
  const [showC, setShowC] = useState(false)
  const [menu, isMenu] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const [postRes, userRes] = await Promise.all([
        axiosInstance.get('/content'),
        axiosInstance.get('/user'),
      ])

      const posts = postRes.data.post
      const users = userRes.data.user

      const mapuser = {}
      users.forEach((user) => {
        mapuser[user._id] = user.login
      })

      setUserMap(mapuser)
      setPosts(posts)
    }

    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <button onClick={() => isMenu(prev => !prev)} className="fixed top-3.5 right-5 z-1">
        <img src="/acc.svg" className="w-10 h-10" alt="" />
      </button>

      <div className={`w-40 bg-white shadow-md h-50 p-4 transition-transform top-0 right-0 duration-500 fixed ${menu ? 'translate-y-0' : '-translate-y-full'}`}>
        <Link to="/post" className="cursor-pointer bg-gray-700 absolute bottom-20 right-4 w-30 text-white px-3 py-1 rounded">Post qoshish</Link>
        <button
          onClick={onLogout}
          className="absolute bottom-4 right-4 bg-red-600 text-white px-3 py-1 rounded"
        >
          Chiqish
        </button>
      </div>

      <div className="max-w-xl mx-auto mt-10 space-y-6">
        {posts.map((post) => (
          <div key={post._id} className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition">
            <div className="text-sm text-end pb-2 text-gray-600 mb-1">
              Author:{' '}
              <span className="font-medium text-indigo-600">
                {userMap[post.author] || 'Unknown'}
              </span>
            </div>

            {post.content ? (
              <img className="w-full h-80 object-cover" src={post.content} alt="" />
            ) : (
              <div className="w-full h-0"></div>
            )}

            <p className="text-gray-700 mt-1">{post.contentText}</p>
            <button onClick={() => {setSelectedId(post._id), setShowC(true)}}> Comments</button>
          </div>
        ))}
      </div>
      {
        showC && <Comments postId={selectedId} setShowC={setShowC} userId={userId}/>
      }

    </>
  )
}

export default Home
