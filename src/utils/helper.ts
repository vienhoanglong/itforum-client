import { colorsAvatar } from "@/constants/global";
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

export const formatTimeAuto = (date: string | number | Date): string => {
  const _date = new Date(date);
  const currentDate = new Date();

  const aDay = 86400000;
  const totalDay = Math.round((currentDate.getTime() - _date.getTime()) / aDay);

  let hh = _date.getHours();
  let mm = _date.getMinutes();
  if (hh < 10) hh = 0 + hh; // Cast to number
  if (mm < 10) mm = 0 + mm; // Cast to number

  if (totalDay < 1) {
    return hh + ":" + mm;
  } else if (totalDay < 7) {
    return totalDay + " ngày trước, " + hh + ":" + mm;
  } else if (totalDay < 365) {
    return (
      (_date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate()) +
      "/" +
      (_date.getMonth() > 8
        ? _date.getMonth() + 1
        : "0" + (_date.getMonth() + 1)) +
      ", " +
      hh +
      ":" +
      mm
    );
  } else {
    return (
      (_date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate()) +
      "/" +
      (_date.getMonth() > 8
        ? _date.getMonth() + 1
        : "0" + (_date.getMonth() + 1)) +
      "/" +
      _date.getFullYear() +
      ", " +
      hh +
      ":" +
      mm
    );
  }
};

export const setColorBackgroundUser = (color: string): string => {
  const result = colorsAvatar.find((item) => item.color === color);
  return result?.value ?? "bg-white";
};

export const formatNumber = (number: number): string => {
  if (number > 9) {
    return '9+';
  } else {
    return number.toString();
  }
}

