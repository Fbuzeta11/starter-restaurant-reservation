//Today's date (YYYY-MM-DD)
function getToday() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

function getDateFormat(date, time = 0) {
  const arr = date.split("-");
  const [year, month, day] = arr;
  if (time) {
    const arrTime = time.split(":");
    const [hour, minute, second = 0] = arrTime;
    return new Date(year, month - 1, day, hour, minute, second);
  }
  return new Date(year, month - 1, day);
}

function checkIfPast(date, time = 0) {
  const reservationDate = getDateFormat(date, time).getTime();
  const currentDate = new Date().getTime();
  const check = currentDate - reservationDate;
  return check > 0 ? true : false;
}

function checkBusinessHours(time) {
  const resTime = Number(time.split(":").join(""));
  if (resTime < 1030) {
    return false;
  } else if (resTime > 2130) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  getToday,
  getDateFormat,
  checkIfPast,
  checkBusinessHours,
};
