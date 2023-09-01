interface IPost {
  _id: string;
  title: string;
  content: string;
  createdBy: string;
  hashtag: string[];
  isDraft: boolean;
  totalView: number;
  status: number;
  thumbnail: string;
  thumbnailName: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
}
export default IPost;
