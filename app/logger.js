// app/logger.js
import winston from "winston";

const logger = winston.createLogger({
  level: "info", // default logging level
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Logs to terminal
    new winston.transports.File({ filename: "security.log" }) // Logs to file
  ]
});

export default logger;
