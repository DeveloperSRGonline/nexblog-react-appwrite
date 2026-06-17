import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import authService from "./Services/appwrite/auth.service"
import { login,logout } from './store/authSlice'
import { Header } from './Components'
import Footer from './Components/Footer/Footer'
import { Outlet } from 'react-router-dom'

const App = () => {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())// logout kyo kuchh nahi toh atlist state ho hi update karegenge 
      }
    })
    .finally(() => setLoading(false))
  }, [dispatch])

  return !loading ? <div className='min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30 selection:text-indigo-200'>
    <Header />
    <main className="grow flex flex-col w-full">
      <Outlet />
    </main>
    <Footer />
  </div> : <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-400 text-lg font-medium">Loading...</div>
}

export default App