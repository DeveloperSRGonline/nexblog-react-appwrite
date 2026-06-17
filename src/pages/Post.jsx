import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../Services/appwrite/config";
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.authSlice.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug)
                .then((post) => {
                    if (post) setPost(post);
                    else navigate("/");
                })
                .catch((error) => {
                    console.log("Appwrite service :: getPost :: error", error);
                    navigate("/");
                });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-10">
            <Container>
                <div className="w-full flex justify-center mb-8 relative border border-zinc-800/80 rounded-2xl overflow-hidden bg-zinc-950/40 p-3 shadow-2xl min-h-[300px] items-center justify-center">
                    {post.featuredImage ? (
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl w-full max-h-[500px] object-cover"
                        />
                    ) : (
                        <div className="text-zinc-600 flex flex-col items-center justify-center py-12">
                            <svg className="w-16 h-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm">No preview image available</span>
                        </div>
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex items-center gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 active:scale-[0.98]">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/20 active:scale-[0.98]" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-8 text-left border-b border-zinc-900 pb-6">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-tight">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}