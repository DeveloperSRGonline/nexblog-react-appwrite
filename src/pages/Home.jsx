import React, { useState, useEffect } from 'react'
import appWriteService from "../Services/appwrite/config"
import { Container, PostCard } from '../Components'


const Home = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appWriteService.getAllPosts().then((posts) => {
            if (posts) {
                setPosts(posts)
            }
        })
    })

    if (posts.length === 0) {
        return (
            <div className='py-8'>
                <Container>
                    <h1 className='text-2xl font-bold'>No post found</h1>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className='p-2 w-1/4'
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