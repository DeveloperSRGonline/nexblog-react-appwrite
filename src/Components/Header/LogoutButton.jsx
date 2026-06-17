import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../Services/appwrite/auth.service"
import {logout} from "../../store/authSlice"

const LogoutButton = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        authService.Logout()
        .then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-block px-4 py-2 text-sm font-semibold text-zinc-300 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 rounded-xl transition-all duration-200 cursor-pointer'
    onClick={handleLogout}
    >Logout</button>
  )
}

export default LogoutButton