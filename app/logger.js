// app/logger.js
import winston from "winston";
import "winston-daily-rotate-file";

// Define JSON log format (for structured logs)
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.json() // Store logs in structured JSON
);

// File rotation (daily JSON security logs)
const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
  filename: "logs/security-%DATE%.log", // logs/security-2025-08-24.log
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d" // keep logs for 14 days
});

// File rotation (daily STRING security logs for Fail2ban)
const dailyRotateStringTransport = new winston.transports.DailyRotateFile({
  filename: "logs/security-string-%DATE%.log", // logs/security-string-2025-08-24.log
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ level, message, timestamp }) => {
      if (typeof message === "object" && message.event === "login_attempt") {
        return `${timestamp} [${level}] login attempt from ${message.ip || "unknown"} with username "${message.username}" failed: ${message.reason}`;
      }
      return `${timestamp} [${level}] ${typeof message === "object" ? JSON.stringify(message) : message}`;
    })
  )
});

const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [
    // Console logs
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          ({ level, message, timestamp }) =>
            `[${timestamp}] ${level}: ${
              typeof message === "object" ? JSON.stringify(message) : message
            }`
        )
      )
    }),

    // JSON daily logs
    dailyRotateFileTransport,

    // String daily logs
    dailyRotateStringTransport
  ]
});

export default logger;

