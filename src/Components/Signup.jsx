import React, { useState } from 'react'
import authService from '../Services/appwrite/auth.service'
import { Link } from 'react-router-dom'
import { login as storeLogin } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Button, Input, Logo } from './index'

const Signup = () => {
    const navitage = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const session = await authService.createAccount(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(storeLogin(data))
                navitage("/")
            }

        } catch (error) {
            setError(error.messagfe)
        }
    }

    return (
        <div className='flex items-center justify-center'>
            <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-250'>
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className='mb-2 text-2xl font-bold text-center text-gray-800'>Signup</h2>
                <p className='mb-4 text-sm text-center text-gray-600'>
                    Already have an account?<Link to="/login" className='text-blue-600 hover:underline'>Login</Link>
                </p>
                {error && <p className='mb-4 text-sm text-center text-red-600'>{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <Input
                        label="Name"
                        type="text"
                        placeholder="Enter your name"
                        {...register("name", {
                            required: true
                        })}
                    />
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"
                            }
                        })}
                    />
                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        {...register("password", {
                            required: true
                        })}
                    />
                    <div className='mt-6'>
                        <Button text="Signup" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup