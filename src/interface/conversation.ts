export interface IConversation {
  members: string[];
  _id: string;
  createBy: string;
  nameConversation: string;
  descConversation: string;
  imgConversation: string;
  theme: string;
}

export interface IConversationRequest {
  members?: string[];
  createBy?: string;
  nameConversation?: string;
  descConversation?: string;
  theme?: string;
}
