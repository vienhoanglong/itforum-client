import LayoutShared from "layout/LayoutDashboard";
import React from "react";
import { useForm } from "react-hook-form";

export const PostAddNew: React.FC = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <LayoutShared>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4">Add new post</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block font-semibold mb-1"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            {...register("title")}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="content"
                            className="block font-semibold mb-1"
                        >
                            Content
                        </label>
                        <textarea
                            id="content"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            rows={4}
                            {...register("content")}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded px-4 py-2"
                    >
                        Add post
                    </button>
                </form>
            </div>
        </LayoutShared>
    );
};

export default PostAddNew;
