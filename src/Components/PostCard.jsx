import React from 'react'
import appwriteService from '../Services/appwrite/config'
import { Link } from 'react-router-dom'


const PostCard = ({ $id, title, featuredImage, content }) => {
    const imgUrl = featuredImage ? appwriteService.getFilePreview(featuredImage) : "";
    return (
        <Link to={`/post/${$id}`} className="block h-full">
            <div className='w-full h-full bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-4 hover:border-zinc-700/60 duration-300 transition-all shadow-xl hover:shadow-indigo-950/5 hover:translate-y-[-4px] group flex flex-col text-left'>
                <div className='w-full aspect-[16/10] overflow-hidden rounded-xl mb-4 bg-zinc-950 flex items-center justify-center'>
                    {imgUrl ? (
                        <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' src={imgUrl} alt={title} />
                    ) : (
                        <div className="text-zinc-600 flex flex-col items-center justify-center">
                            <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs">No Image</span>
                        </div>
                    )}
                </div>
                <h2 className='text-zinc-100 group-hover:text-indigo-400 transition-colors duration-200 text-lg font-bold font-sans line-clamp-2 mt-auto'>{title}</h2>
            </div>
        </Link>
    )
}
export default PostCard