import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios/axiosInstanse'

function User({ userId, onSelectUser }) {
  const [users, setUsers] = useState([])
  const [menu, isMenu] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axiosInstance.get('/user')
      const filtered = res.data.user.filter((u) => u._id !== userId)
      setUsers(filtered)
    }
    fetchUsers()
  }, [userId])

  return (
    <>
    <button onClick={() => isMenu(prev => !prev)} className={` cursor-pointer relative w-8 h-8 focus:outline-none transition-transform duration-600 z-10 ${menu ? 'top-3 translate-x-53' : 'top-3 translate-x-5'}`}>
        <div className={`block absolute h-0.5 bg-black transform transition duration-300 ${menu ? 'rotate-45 top-3.5 w-8' : ' w-6 top-2 right-0'}`}></div>
        <div className={`block absolute h-0.5 w-8  bg-black transform transition duration-300 ${menu ? '-rotate-45 top-3.5 ' : ' top-6'}`}></div>
      </button>
    <div className={`w-64 bg-white shadow-md h-screen p-4 transition-transform duration-500 absolute ${menu ? 'translate-x-0 ' : '-translate-x-full'}`}>
      <h2 className=" text-lg font-bold mb-4">Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user._id}
            onClick={() => onSelectUser(user._id)}
            
          >
            <div className={({isActive}) => `cursor-pointer p-2 rounded hover:bg-gray-200 transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'}`}>
            👤 {user.login}
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default User
