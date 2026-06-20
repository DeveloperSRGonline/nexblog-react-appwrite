import React from 'react'
import { Container, Logo, LogoutButton } from "../index.js"
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)

  const navItem = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]
  return (
    <header
      className='sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900/80 text-zinc-100 py-3.5 transition-all duration-300'
    >
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Link to="/" className="flex items-center transition-opacity hover:opacity-90">
              <Logo />
            </Link>
          </div>
          <ul className='flex items-center gap-2 ml-auto'>
            {navItem.map((item) =>
            (item.active ? (
              <li key={item.name}>
                <NavLink
                  to={item.slug}
                  className={({ isActive }) =>
                    `inline-block px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                      isActive 
                        ? "bg-indigo-600/15 text-indigo-400 border border-indigo-500/20 shadow-sm shadow-indigo-500/5" 
                        : "text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/40 border border-transparent"
                    }`
                  }
                >{item.name}</NavLink>
              </li>
            ) : null)
            )}
            {authStatus && (
              <li className="ml-1">
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header