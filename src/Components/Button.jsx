import React from 'react'

const Button = ({
    children,
    type = "button",
    bgColor = "bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] shadow-lg shadow-indigo-600/20",
    textColor = "text-white",
    className = "",
    ...props
}) => {
    // Fallback if text is passed as a prop instead of children
    const content = children || props.text;
    const cleanProps = { ...props };
    delete cleanProps.text;

    return (
        <button
            type={type}
            className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${bgColor} ${textColor} ${className}`}
            {...cleanProps}
        >
            {content}
        </button>
    )
}

export default Button