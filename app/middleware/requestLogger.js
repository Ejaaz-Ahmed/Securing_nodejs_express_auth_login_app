import logger from "../logger.js";

const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl} - IP: ${req.ip}`);
  next();
};

export default requestLogger;
