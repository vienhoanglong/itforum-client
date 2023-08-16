export interface IDiscussion {
  _id: string;
  title: string;
  content: string;
  createBy: string;
  totalView: 0;
  topic: string[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v?: number;
  isDraft: boolean;
}
export default IDiscussion;
