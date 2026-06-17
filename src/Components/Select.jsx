import React, { useId } from 'react'

const Select = ({
    options,
    label,
    ref,
    className = "",
    ...props
}) => {
    const id = useId()

    return (
        <div className='w-full text-left'>
            {label && (
                <label 
                    htmlFor={id} 
                    className="inline-block mb-1.5 pl-1 text-sm font-semibold text-zinc-300"
                >
                    {label}
                </label>
            )}
            <select 
                {...props}
                id={id}
                ref={ref}
                className={`px-4 py-2.5 rounded-xl bg-zinc-900 text-zinc-100 outline-none border border-zinc-800/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 transition-all duration-200 w-full cursor-pointer ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} className="bg-zinc-900 text-zinc-100">
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select