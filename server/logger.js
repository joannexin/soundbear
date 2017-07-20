const Logger = require("filelogger"),
      logger = new Logger("debug", "debug", "./log/soundbear.log");

module.exports = {
  log: (message) => {
    logger.log("info", message);
  },
  error: (message) => {
    logger.log("error", message);
  }
};
