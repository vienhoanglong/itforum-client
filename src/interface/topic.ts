interface Topic {
  _id: string;
  name: string;
  desc: string;
  type: string;
  color: string;
  hide: boolean;
  img?: string;
  isDraft: boolean;
  createdAt: string;
}
export default Topic;
