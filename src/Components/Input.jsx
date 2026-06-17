import React, { useId } from 'react'

const Input = ({
    label,
    type = "text",
    className = "",
    ref,
    ...props
}) => {
    const id = useId()

    return (
        <div className='w-full text-left mb-4'>
            {label && (
                <label
                    htmlFor={id}
                    className="inline-block mb-1.5 pl-1 text-sm font-semibold text-zinc-300"
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                ref={ref}
                className={`px-4 py-2.5 rounded-xl bg-zinc-900 text-zinc-100 placeholder:text-zinc-500 outline-none border border-zinc-800/80 hover:border-zinc-700/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 transition-all duration-200 w-full font-medium ${className}`}
                id={id}
                {...props}
            />
        </div>
    )
}

export default Input