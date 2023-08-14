import moment from "moment";

export default function convertDateTime(
  dateString: string,
  formatDate = "YYYY-MM-DD"
): string {
  const dateObject = moment(dateString);
  return dateObject.format(formatDate);
}
