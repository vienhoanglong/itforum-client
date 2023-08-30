export interface IComment {
  _id?: string;
  _v?: number;
  content?: string;
  left?: number;
  right?: number;
  createdAt?: string;
  createBy?: string;
  discussId?: string;
  countChildComments?: number;
  commentParentId?: string | null;
}
export default IComment;
