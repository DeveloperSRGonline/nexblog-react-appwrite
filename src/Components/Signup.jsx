import React, { useState } from 'react'
import authService from '../Services/appwrite/auth.service'
import { Link } from 'react-router-dom'
import { login as storeLogin } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Button, Input, Logo } from './index'
import { useNavigate } from 'react-router-dom'

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
                if (userData) dispatch(storeLogin({ userData }))
                navitage("/")
            }

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full py-12 px-4 min-h-screen ambient-glow'>
            <div className='relative z-10 mx-auto w-full max-w-md bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-10 md:p-12 shadow-2xl text-left'>
                <div className='mb-8 flex justify-center'>
                    <span className='inline-block w-full max-w-60'>
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className='mb-2 text-3xl font-extrabold text-center text-zinc-100 tracking-tight'>Create Account</h2>
                <p className='mb-6 text-sm text-center text-zinc-400'>
                    Already have an account?&nbsp;
                    <Link to="/login" className='font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-200 hover:underline'>Login</Link>
                </p>
                {error && <p className='mb-6 text-sm text-center text-red-400 bg-red-500/10 border-2 border-red-500/30 px-4 py-2.5 rounded-lg font-medium'>{error}</p>}
                <form onSubmit={handleSubmit(create)} className="space-y-6">
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
                        <Button type="submit" className="w-full">Sign Up</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup