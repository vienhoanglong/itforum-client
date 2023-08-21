export interface IMessage{
    _id: string;
  contentMessage: string;
  conversationId: string;
  senderId: string;
  typeMessage: string;
  reactionMessage: any;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IMessageRequest{
  contentMessage: string;
  conversationId: string;
  senderId: string;
  reactionMessage?: string[];
  typeMessage?: string;
}