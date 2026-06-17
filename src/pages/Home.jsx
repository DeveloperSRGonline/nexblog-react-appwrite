import React, { useState, useEffect } from 'react'
import appWriteService from "../Services/appwrite/config"
import { Container, PostCard } from '../Components'


const Home = () => {
    const [posts, setPosts] = useState([])
    console.log(posts)
    useEffect(() => {
        appWriteService.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }else{
                    setPosts([])
                    console.log("no post found")
                }
            })
            .catch((error) => {
                console.log("Appwrite service :: getPosts :: error", error)
                setPosts([])
            })
    }, [])

    if (posts.length === 0) {
        return (
            <div className='py-20 flex flex-col items-center justify-center w-full min-h-[50vh] text-center'>
                <Container>
                    <div className="flex flex-col items-center justify-center max-w-md mx-auto">
                        <div className='p-4 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 mb-6'>
                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                        </div>
                        <h1 className='text-3xl font-extrabold text-zinc-100 tracking-tight mb-2'>No Posts Published Yet</h1>
                        <p className='text-zinc-400 mb-8 text-sm'>Be the first to share your thoughts, stories, and ideas with the world.</p>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-10'>
            <Container>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className='w-full'
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home