import React,{useState,useEffect} from 'react'
import {Container,PostForm} from "../Components"
import appWriteService from "../Services/appwrite/config"
import { useNavigate, useParams } from 'react-router-dom'

const EditPost = () => {
    const [post,setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      if(slug){
        appWriteService.getPost(slug).then((post)=>{
            if(post){
                setPost(post)
            }
        })
      }
    })
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost