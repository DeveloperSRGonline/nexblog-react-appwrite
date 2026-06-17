import React from 'react'

const Logo = ({width="100px"}) => {
  return (
    <div className="flex items-center gap-2 font-extrabold text-2xl tracking-tight bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent select-none">
      Nex<span className="text-zinc-100">Blog</span>
    </div>
  )
}

export default Logo