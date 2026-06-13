import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import authService from "./Services/appwrite/auth.service"
import { login,logout } from './store/authSlice'
import { Header } from './Components'
import Footer from './Components/Footer/Footer'

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
  })

  return !loading ? <div className='min-h-screen flex flex-wrap content-between bg-gray-900'>
    <div className='w-full block'>
      <Header />
      <main>

      </main>
      <Footer />
    </div>
  </div> : <div>Loading...</div>
}

export default App