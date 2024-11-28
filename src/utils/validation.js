const dayjs = require('dayjs');
const customParseFormat = require("dayjs/plugin/customParseFormat");


function isDateTimeRFC3339(datetime) {
  dayjs.extend(customParseFormat)

  return dayjs(datetime, "YYYY-MM-DDTHH:mm:ssZ").isValid();
}

function isDate(date) {
  dayjs.extend(customParseFormat)

  return dayjs(datetime, "YYYY-MM-DD").isValid();
}

module.exports = {
  isDateTimeRFC3339,
  isDate
}