// app/logger.js
import winston from "winston";
import "winston-daily-rotate-file";

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.json() // Store logs in structured JSON
);

// File rotation (daily security logs)
const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
  filename: "logs/security-%DATE%.log", // logs/security-2025-08-24.log
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d" // keep logs for 14 days
});

const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          ({ level, message, timestamp }) =>
            `[${timestamp}] ${level}: ${typeof message === "object" ? JSON.stringify(message) : message}`
        )
      )
    }),
    dailyRotateFileTransport
  ]
});

export default logger;
