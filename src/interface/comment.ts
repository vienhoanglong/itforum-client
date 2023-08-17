export interface IComment {
  _id?: string;
  content?: string;
  left?: 2;
  right?: 3;
  createdAt?: string;
  commentParentId?: string | null;
}
export default IComment;
