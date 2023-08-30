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
  statusDiscuss: number;
  __v?: number;
  isDraft: boolean;
}
export default IDiscussion;
