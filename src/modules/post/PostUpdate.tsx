import React, { useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";
import QuillEditor from "@/components/editor/QuillEditor";
import { Label } from "@/components/label";
import { Button } from "@/components/button";
import "react-quill/dist/quill.snow.css";
import UploadImage from "@/components/uploadImage/UploadImage";
import Select from "react-select";
import { colorSelectTopic } from "@/constants/global";
import IPostCreate from "@/interface/API/IPostCreate";
import Topic from "@/interface/topic";
import { toast } from "react-toastify";
import { UpdatePost } from "@/services/postService";
import { usePostStore } from "@/store/postStore";

interface PostUpdatePageProps {
  onCancel: () => void;
  listAllTopic: Topic[] | null;
  postId: string;
}

export const PostUpdatePage: React.FC<PostUpdatePageProps> = ({
  onCancel,
  listAllTopic,
  postId,
}) => {
  const { post, getPostByPostId } = usePostStore();
  const [title, setTitle] = useState<string>("");

  const [content, setContent] = useState<string>("");
  const [postUpdate, setPostUpdate] = useState<IPostCreate | null>(null);
  const [uploadImg, setNewUploadImg] = useState<File | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [topicError, setTopicError] = useState<string | null>(null);
  const { change, setChange } = usePostStore();
  useMemo(() => {
    postId && getPostByPostId(postId);
  }, [postId]);

  useMemo(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setPostUpdate(post);
    }
  }, [post]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCoverImageUpload = (file: File) => {
    setNewUploadImg(file);
    setUploadComplete(uploadComplete);
  };
  const handleDeleteImage = () => {
    setUploadComplete(uploadComplete);
  };
  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const getSkillLabelById = (topicId: string) => {
    const topic = listAllTopic?.find((topic: Topic) => topic._id === topicId);
    return topic ? topic.name : "";
  };
  const handleTopicChange = (selectedOptions: any) => {
    const newTopic =
      selectedOptions && selectedOptions.map((option: any) => option.value);
    const updateTopic = newTopic;
    const createPost: IPostCreate = {
      ...postUpdate,
      hashtag: updateTopic,
    };

    setPostUpdate(createPost);
  };

  const selectOptions = listAllTopic
    ?.filter((e) => e.hide === false && e.isDraft === false)
    .map((skill: Topic) => ({
      value: skill._id,
      label: skill.name,
      color: `${
        colorSelectTopic[skill.color as keyof typeof colorSelectTopic]
      }`,
    }));

  const validateFields = () => {
    let isValid = true;

    if (!postUpdate || postUpdate.hashtag?.length === 0) {
      setTopicError("Please select at least one topic");
      isValid = false;
    } else {
      setTopicError(null);
    }

    return isValid;
  };
  const handleSubmit = async () => {
    setSubmitted(true);

    if (title === "" || content === "" || content === "<p><br></p>") {
      return;
    }

    if (validateFields()) {
      const newPosts: IPostCreate = {
        ...postUpdate,
        title: title,
        content: content,
      };
      if (uploadImg != null) {
        post && (await UpdatePost(newPosts, post._id, uploadImg));
        setChange(!change);
      } else {
        post && (await UpdatePost(newPosts, post._id));
        setChange(!change);
      }
      toast.success(" Updated post successfully! ", {
        position: "top-center",
        autoClose: 3000,
      });
      onCancel();
      console.log(newPosts, uploadImg);
    }
  };

  return (
    <div className=" h-full dark:text-light0 w-full overflow-auto rounded-lg mx-auto flex flex-col ">
      <div className=" pb-4 h-auto w-full">
        <h4 className="text-xl font-bold text-darker ">New post</h4>
      </div>
      <div className="h-auto w-full">
        <form className="w-full flex flex-col md:flex-row overflow-y-auto overflow-x-hidden h-auto">
          <div className="w-full h-full md:w-1/3">
            <div className="mb-4">
              <Label htmlFor="title" className="block text-xs font-semibold">
                Title
              </Label>
              <input
                value={title}
                className="border text-black border-gray-300 text-xs w-full h-full bg-light4  px-4 py-2 rounded-lg "
                placeholder="Adding your title"
                onChange={(e) => handleTitleChange(e)}
              />
              {submitted && title === "" && (
                <div className="block text-xs text-red-500 mt-1">
                  Title is required.
                </div>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="hastag" className="block text-xs font-semibold">
                Hastag
              </Label>
              <div>
                <Select
                  isMulti
                  isSearchable
                  placeholder="Choose topic..."
                  options={selectOptions}
                  value={postUpdate?.hashtag?.map((skill) => ({
                    value: skill,
                    label: getSkillLabelById(skill),
                  }))}
                  onChange={handleTopicChange}
                  className=" rounded-[12px] text-xs dark:bg-dark0 shadow-inner"
                  noOptionsMessage={() => "No topic found..."}
                  styles={{
                    menu: (provided) => ({
                      ...provided,
                      height: "300px",
                      overflowY: "auto",
                      color: "black",
                    }),
                  }}
                />
              </div>
              {submitted && postUpdate?.hashtag?.length === 0 && (
                <div className="block text-xs text-red-500 mt-1">
                  {topicError}
                </div>
              )}
            </div>
            <div className="mb-4">
              <Label
                htmlFor="uploadImage"
                className="block text-xs font-semibold"
              >
                Upload image
              </Label>
              <UploadImage
                onImageUpload={handleCoverImageUpload}
                onDeleteImage={handleDeleteImage}
              ></UploadImage>
            </div>
          </div>

          <div className=" px-2 pb-2 w-full h-full md:w-2/3 md:h-[340px]">
            <Label htmlFor="content" className="block text-xs font-semibold">
              Content
            </Label>
            <QuillEditor
              value={content}
              onChange={handleContentChange}
            ></QuillEditor>
            {submitted && (content === "" || content === "<p><br></p>") && (
              <div className="block text-xs mt-2 text-red-500">
                Content is required.
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="w-full h-auto flex flex-wrap justify-end">
        <button
          className=" text-light0 text-xs mx-2 bg-lighter hover:bg-darker rounded-xl px-4 py-2 mt-2 "
          onClick={handleSubmit}
        >
          Update
        </button>
        <Button
          className=" text-light0 text-xs mx-2 rounded px-4 py-2 mt-2 bg-red3 hover:bg-red2"
          kind="custom"
          type="submit"
          handle={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default PostUpdatePage;
