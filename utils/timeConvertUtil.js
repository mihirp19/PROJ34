import moment from "moment";

// Converting time for payload body from user input
export const parseUserDateTime = (date, time) => {
  const dateTimeString = `${date} ${time}`;
  const parsed = moment(dateTimeString, ["YYYY-MM-DD h:mm A", "YYYY-MM-DD HH:mm"]);

  if (!parsed.isValid()) {
    throw new Error("Invalid date or time format");
  }

  return parsed.toDate();
};
