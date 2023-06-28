import LayoutShared from "@/layout/LayoutDefault";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Label } from "@/components/label";
import { Button } from "@/components/button";
import { FormGroup } from "@/components/common";
import { Input } from "components/input";

interface FormDataPosting {
    title: string;
    hastag: string;
    content: string;
}

export const PostAddNew: React.FC = () => {
    const [content, setContent] = useState<string>("");

    const onSubmit = (data: FormDataPosting) => {
        console.log(data);
    };

    const handleContentChange = (value: string) => {
        setContent(value);
    };

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === FileReader.DONE) {
                setSelectedImage(reader.result as string);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };
    const editorStyles = {
        border: "2px solid #3A3A43",
    };
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormDataPosting>({
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
            <div className="container h-full mx-auto">
                <div className="top-0 z-10 p-4 text-white bg-blue-600 rounded-lg shadow-md ">
                    <h1 className="text-xl font-bold ">Add new post</h1>
                </div>
                <div className=" overflow-auto h-full">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4 mt-4">
                            <FormGroup>
                                <Label
                                    htmlFor="title"
                                    className="block font-semibold"
                                >
                                    Title
                                </Label>

                                <Input control={control} name="title"></Input>
                            </FormGroup>
                        </div>
                        <div className="mb-4">
                            <FormGroup>
                                <Label
                                    htmlFor="hastag"
                                    className="block font-semibold"
                                >
                                    Hastag
                                </Label>
                                <Input control={control} name="hastag"></Input>
                            </FormGroup>
                        </div>
                        <div className="mb-4">
                            <FormGroup>
                                <Label
                                    htmlFor="imageUpload"
                                    className="block font-semibold mb-1"
                                >
                                    Upload image for background:{" "}
                                </Label>
                                <input
                                    type="file"
                                    id="imageUpload"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {selectedImage && (
                                    <div>
                                        <h2>Preview:</h2>
                                        <img
                                            src={selectedImage}
                                            alt="Preview"
                                        />
                                    </div>
                                )}
                            </FormGroup>
                        </div>
                        <div className="mb-4 ">
                            <FormGroup>
                                <Label
                                    htmlFor="content"
                                    className="block font-semibold"
                                >
                                    Content
                                </Label>
                                <ReactQuill
                                    className="w-full mb-4 overflow-auto rounded-lg "
                                    value={content}
                                    onChange={handleContentChange}
                                    style={editorStyles}
                                    modules={{
                                        toolbar: toolbarOptions,
                                    }}
                                />
                            </FormGroup>
                        </div>

                        <Button
                            className="bg-blue-500 text-white  rounded px-4 py-2"
                            kind="primary"
                            type="submit"
                        >
                            Add post
                        </Button>
                    </form>
                </div>
            </div>
        </LayoutShared>
  );
};

export default PostAddNew;
