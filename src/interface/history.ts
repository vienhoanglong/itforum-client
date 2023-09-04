export interface HistoryNotification {
  _id: string;
  title: string;
  link: string;
  type: string;
  sendTo: string[];
  readBy: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
