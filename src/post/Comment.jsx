import { useEffect, useState } from "react"
import axiosInstance from "../axios/axiosInstanse"

function Comment({ postId }) {
  const [comments, setComments] = useState([])
  const [userMap, setUserMap] = useState({})

  const fetchLogin = async (userId) => {
    try {
      const res = await axiosInstance.get(`/user/${userId}`)
      return res.data.user.login
    } catch {
      return 'Nomaʼlum foydalanuvchi'
    }
  }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get(`/comment/post/${postId}`)
        const allComments = res.data.comment

        // Fill userMap for each author
        const updatedMap = { ...userMap }
        for (const c of allComments) {
          if (!updatedMap[c.author]) {
            const login = await fetchLogin(c.author)
            updatedMap[c.author] = login
          }
        }

        setUserMap(updatedMap)
        setComments(allComments)
      } catch (err) {
        console.error("Kommentlarni olishda xatolik:", err)
      }
    }

    fetchComments()
    const interval = setInterval(fetchComments, 5000)
    return () => clearInterval(interval)
  }, [postId])

  const getColorFromName = (user) => {
  const colors = ['#00a6ff', '#ffe400', '#49ff00', '#9e00ff', '#ff0000', '#0400ff', '#00ff77', '#ff9300', '#e0e91a'];
  let hash = 0;
  for (let i = 0; i < user.length; i++) {
    hash = user.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

  return (
    <div className="fixed inset-0 pt-5 pb-24 px-4 overflow-y-auto z-20 bg-white">
      <div className="max-w-xl mx-auto flex flex-col gap-3">
        {comments.map((c) => (
          <div key={c._id} className=" bg-white p-3 rounded-lg shadow border">
            <p className="text-sm text-gray-600 font-semibold" style={{ color: getColorFromName(userMap[c.author] || '') }}>{userMap[c.author] || 'Nomaʼlum'}:</p>
            <p className="text-gray-800 break-words">{c.text}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-center text-gray-500">Kommentlar yo‘q</p>
        )}
      </div>
    </div>
  )
}

export default Comment
