/**
 * @public
 *
 * Given a date object returns a formatted string with
 * format DD.MM.YYYY hh:mm:ss
 *
 * @param dateObj
 */
const getFormattedDate = (dateObj: Date): string => {
  const [dateStr, monthStr, yearStr, hoursStr, minutesStr, secondsStr] = [
    dateObj.getDate().toString(),
    (dateObj.getMonth() + 1).toString(),
    dateObj.getFullYear().toString(),
    dateObj.getHours().toString(),
    dateObj.getMinutes().toString(),
    dateObj.getSeconds().toString(),
  ];

  const [date, month, hours, minutes, seconds] = [
    dateStr.length > 1 ? dateStr : `0${dateStr}`,
    monthStr.length > 1 ? monthStr : `0${monthStr}`,
    hoursStr.length > 1 ? hoursStr : `0${hoursStr}`,
    minutesStr.length > 1 ? minutesStr : `0${minutesStr}`,
    secondsStr.length > 1 ? secondsStr : `0${secondsStr}`,
  ];

  return `${date}.${month}.${yearStr} ${hours}:${minutes}:${seconds}`;
};

export { getFormattedDate };
