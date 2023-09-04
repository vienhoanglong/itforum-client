interface IDiscussionCreate {
  title?: string;
  content?: string;
  createBy?: string;
  topic?: string[];
  statusDiscuss?: number;
  reasonBan?: string;
}
export default IDiscussionCreate;
