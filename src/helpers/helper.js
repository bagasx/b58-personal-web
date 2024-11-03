const hbs = require("hbs");

hbs.registerHelper("tech", function (array, value) {
  return array.includes(value);
});

hbs.registerHelper("isExist", function (array, value) {
  return array.includes(value);
});

hbs.registerHelper("dateDiff", function (startDate, endDate) {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const time = Math.abs(date2 - date1);
  const day = Math.ceil(time / (1000 * 60 * 60 * 24));
  const month = Math.floor(day / 31);
  const year = Math.floor(month / 12);

  if (day <= 1) {
    return `${day} day`;
  } else if (day <= 31) {
    return `${day} days`;
  } else if (month <= 1) {
    return `${month} Month`;
  } else if (month <= 12) {
    return `${month} Months`;
  } else if (year <= 1) {
    return `${year} Year`;
  } else {
    return `${year} Years`;
  }
});
