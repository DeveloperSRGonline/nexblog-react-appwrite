import { useState,useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


const Protected = ({children,authentication = true}) => {
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.authSlice.status)

  useEffect(() => {
    if(authentication && authStatus === false){
        navigate("/login")
    }else if(!authentication && authStatus === true){
        navigate("/")
    }
  },[authStatus,navigate,authentication])

  return (
    <div>{children}</div>
  )
}

export default Protected