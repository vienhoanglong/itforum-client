import LayoutShared from "layout/LayoutDashboard";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Label } from "@/components/label";
import { Button } from "@/components/button";
import { FormGroup } from "@/components/common";
import { Input } from "components/input";

export const PostAddNew: React.FC = () => {
    //const { register, handleSubmit } = useForm();
    const [content, setContent] = useState("");
    const onSubmit = (data: any) => {
        console.log(data);
    };
    const handleContentChange = (value: any) => {
        setContent(value);
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: "onSubmit",
    });

    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
        ["clean"],
    ];

    return (
        <LayoutShared>
            <div className="container mx-auto h-auto">
                <div className="sticky top-0 rounded-lg z-10 p-4 text-white bg-blue-600 shadow-md">
                    <h1 className="text-2xl font-bold ">Add new post</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4 mt-4">
                            <FormGroup>
                                <Label
                                    htmlFor="title"
                                    className="block font-semibold mb-1"
                                >
                                    Title
                                </Label>
                                {/* <input
                                    type="text"
                                    id="title"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    {...register("title")}
                                /> */}
                                <Input control={control} name="title"></Input>
                            </FormGroup>
                        </div>
                        <div className="mb-4">
                            <Label
                                htmlFor="hastag"
                                className="block font-semibold mb-1"
                            >
                                Hastag
                            </Label>
                            <input
                                type="text"
                                id="hastag"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                //{...register("hastag")}
                            />
                        </div>
                        <div className=" h-80 ">
                            <Label
                                htmlFor="content"
                                className="block font-semibold mb-1"
                            >
                                Content
                            </Label>
                            <div className="overflow-auto">
                                <ReactQuill
                                    className="border-gray-300 w-full mb-4"
                                    value={content}
                                    onChange={handleContentChange}
                                    modules={{
                                        toolbar: toolbarOptions,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <Button
                                className="bg-blue-500 text-white rounded px-4 py-2"
                                kind="primary"
                                type="submit"
                            >
                                Add post
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </LayoutShared>
    );
};

export default PostAddNew;
