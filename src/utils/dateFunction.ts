export enum monthEnum {
  "Jan" = 1,
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
}

export enum daysEnum {
  "Sun" = 1,
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
}

export const getDaysInMonth = (
  month: monthEnum,
  year: number,
): (number | "X")[][] => {
  const totalDays = new Date(year, month, 0).getDate();
  let startDay = new Date(year, month - 1, 1).getDay();

  const weekInMonth = Math.ceil((totalDays + startDay) / 7) * 7;
  const pendingDayCount = weekInMonth - (totalDays + startDay);

  let dayCount = 1;
  const dateArray: ("X" | number)[][] = [];
  while (dayCount < totalDays + pendingDayCount) {
    const weekDay: ("X" | number)[] = [];
    for (let i = 0; i < 7; i++) {
      if (dayCount > totalDays + pendingDayCount) {
        break;
      }
      if (startDay) {
        weekDay.push("X");
        startDay--;
      } else if (dayCount <= totalDays) {
        weekDay.push(dayCount);
        dayCount++;
      } else {
        weekDay.push("X");
        dayCount++;
      }
    }
    dateArray.push(weekDay);
  }
  return dateArray;
};
