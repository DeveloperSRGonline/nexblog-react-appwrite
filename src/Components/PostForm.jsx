import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from "./index"
import appWriteService from "../Services/appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostForm = ({ post }) => {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.authSlice.userData)

    // when user submit data
    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appWriteService.uploadFile(data.image[0]) : null
            if (file) {
                await appWriteService.deleteFile(post.featuredImage)
            }

            const dbPost = await appWriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }

        } else {
            const file = data.image[0] ? await appWriteService.uploadFile(data.image[0]) : null
            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                await appWriteService.createPost({
                    ...data,
                    userId: userData.$id // user ki id kisne post banaya
                })
            }
        }
    }

    // watch title and create slug
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");

        return ""
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title, {
                    shouldValidate: true
                }))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col lg:flex-row gap-8 text-left">
            <div className="w-full lg:w-2/3 space-y-6">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="w-full"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="w-full"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-full lg:w-1/3 space-y-6 bg-zinc-900/30 border border-zinc-800/80 p-6 rounded-2xl h-fit shadow-xl backdrop-blur-sm">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="w-full text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-zinc-100 hover:file:bg-zinc-700"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && post.featuredImage && (
                    <div className="w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 p-2">
                        <img
                            src={appWriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg w-full object-cover max-h-60"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="w-full"
                    {...register("status", { required: true })}
                />
                <Button 
                    type="submit" 
                    bgColor={post ? "bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 active:scale-[0.98]" : undefined} 
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm