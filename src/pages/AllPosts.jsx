import React, { useState, useEffect } from 'react'
import appWriteService from "../Services/appwrite/config"
import { Container, PostCard } from '../Components'

const AllPosts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appWriteService.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
            .catch((error) => {
                console.log("Appwrite service :: getPosts :: error", error)
                setPosts([])
            })
    }, [])

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

export default AllPosts