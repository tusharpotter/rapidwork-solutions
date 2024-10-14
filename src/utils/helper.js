import moment from "moment-timezone";

export function sortArrOfObjects(arr, param, type) {
  if (type === "desc")
    return arr.sort((a, b) => (a[param] > b[param] ? -1 : b[param] > a[param] ? 1 : 0));
  else if (type === "asc")
    return arr.sort((a, b) => (a[param] > b[param] ? 1 : b[param] > a[param] ? -1 : 0));
}

export function sortArrOfObjectsByDate(arr, param, type) {
  return arr.sort((a, b) => {
    a = new Date(a[param]).getTime();
    b = new Date(b[param]).getTime();

    if (type === "desc") return a > b ? -1 : b > a ? 1 : 0;
    else return a > b ? 1 : b > a ? -1 : 0;
  });
}

export function getDeadlineTime(deadline, time_zone) {
  return moment(deadline).tz(time_zone).format("Do MMM hh:mm a");
}

export function getLocalTimeStamp(utcTime) {
  utcTime = moment(utcTime).format("YYYY-MM-DD HH:mm:ss");
  let newUtc = moment.utc(utcTime, "YYYY-MM-DD HH:mm:ss");
  return newUtc.local().format("MMM Do hh:mm a");
}
export function getLocalDate(utcTime) {
  utcTime = moment(utcTime).format("YYYY-MM-DD HH:mm:ss");
  let newUtc = moment.utc(utcTime, "YYYY-MM-DD HH:mm:ss");
  return newUtc.local().format("MMMM Do");
}
export function getLocalTimeNotif(utcTime) {
  utcTime = moment(utcTime).format("YYYY-MM-DD HH:mm:ss");
  let newUtc = moment.utc(utcTime, "YYYY-MM-DD HH:mm:ss");
  return newUtc.local().format("DD MMMM hh:mm a");
}

export function getDateTimeForTimeline(utcTime) {
  utcTime = moment(utcTime).format("YYYY-MM-DD HH:mm:ss");
  let newUtc = moment.utc(utcTime, "YYYY-MM-DD HH:mm:ss");
  let newUtcLocal = newUtc.local();
  return { date: newUtcLocal.format("Do MMM"), time: newUtcLocal.format("hh:mm a") };
}

export function capitaliseFirstLetter(word) {
  return word[0].toUpperCase() + word.slice(1);
}
