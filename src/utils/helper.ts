import moment from "moment";

export default function convertDateTime(
  dateString: string,
  formatDate = "YYYY-MM-DD"
): string {
  const dateObject = moment(dateString);
  return dateObject.format(formatDate);
}

export const coverDefault =
  "https://i.pinimg.com/originals/25/e1/4d/25e14d756f86b34a3bd12d65f329d03a.jpg";
