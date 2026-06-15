import { useState,useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


export default Protected = ({children,authentication = true}) => {
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    if(authentication && authStatus === false){
        navigate
    }
  },[authStatus,navigate,authentication])
}