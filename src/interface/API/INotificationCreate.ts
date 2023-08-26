interface INotificationCreate {
  titleNotice: string;
  descNotice: string;
  createdBy: string;
  typeNotice: string;
  file?: File;
  level: string;
}
export default INotificationCreate;
