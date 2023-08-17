export interface ICommentCreate {
  discussId?: string;
  createBy?: string;
  content?: string;
  left?: number;
  right?: number;
  commentParentId?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
export default ICommentCreate;
