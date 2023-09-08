import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    ["clean"],
  ];

  const handleContentChange = (value: string) => {
    onChange(value);
  };

  return (
    <div className="h-full border-gray-500 bg-light4 dark:bg-dark1 rounded-lg ">
      <ReactQuill
        className="h-[calc(100%-65px)] text-xs"
        value={value}
        onChange={handleContentChange}
        modules={{
          toolbar: toolbarOptions,
        }}
      />
    </div>
  );
};

export default QuillEditor;
