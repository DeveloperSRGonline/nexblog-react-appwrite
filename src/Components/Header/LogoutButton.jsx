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
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={handleLogout}
    >LogoutButton</button>
  )
}

export default LogoutButton