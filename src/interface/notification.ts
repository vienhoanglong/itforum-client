export interface INotification {
  _id: string;
  titleNotice: string;
  descNotice: string;
  createdBy: string;
  typeNotice: string;
  level: string;
  isPublished: boolean;
  isDeleted: boolean;
  file: string;
  filename?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export default INotification;
