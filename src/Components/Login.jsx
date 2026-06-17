import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as storeLogin } from '../store/authSlice'
import { Button, Input, Logo } from "./index"
import { useDispatch } from 'react-redux'
import authService from '../Services/appwrite/auth.service'
import { useForm } from 'react-hook-form'


const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    // just a state for error storing
    const [error, setError] = useState(null)

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(storeLogin({ userData }))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div
            className='flex items-center justify-center w-full py-12 px-4 min-h-screen ambient-glow'
        >
            <div className='relative z-10 mx-auto w-full max-w-md bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-10 md:p-12 shadow-2xl text-left'>
                <div className='mb-8 flex justify-center'>
                    <span className='inline-block w-full max-w-60'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-3xl font-extrabold leading-tight text-zinc-100 tracking-tight'>
                    Welcome Back
                </h2>
                <p className='mt-3 text-center text-sm text-zinc-400'>
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className='font-semibold text-indigo-400 transition-all duration-200 hover:text-indigo-300 hover:underline'
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-400 bg-red-500/10 border-2 border-red-500/30 px-4 py-2.5 rounded-lg mt-6 text-sm text-center font-medium'>
                    {error}
                </p>}
                <form
                    className='mt-8'
                    onSubmit={handleSubmit(login)}>
                    <div className="space-y-6">
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type='email'
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type='password'
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true
                            })}
                        />
                        <Button
                            type='submit'
                            className='w-full' // stopped at 36:52
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login