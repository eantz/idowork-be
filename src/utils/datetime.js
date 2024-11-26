const dayjs = require('dayjs');
const customParseFormat = require("dayjs/plugin/customParseFormat");

function parseRFC3339Datetime(datetime) {
  dayjs.extend(customParseFormat)

  return dayjs(datetime, "YYYY-MM-DDTHH:mm:ssZ");
}

module.exports = {
  parseRFC3339Datetime
}