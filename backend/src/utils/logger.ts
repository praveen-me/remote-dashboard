import { createLogger, format, transports } from "winston";
import { Request, Response, NextFunction } from "express";
const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), colorize(), logFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, url, headers, body } = req;

  res.on("finish", () => {
    const { statusCode } = res;
    logger.info(`${method} ${url} ${statusCode} - ${headers["user-agent"]}`);
  });

  next();
};
