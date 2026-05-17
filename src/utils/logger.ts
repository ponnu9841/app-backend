import winston from "winston";
import * as env from "../config/env";

const { combine, timestamp, printf, colorize, json } = winston.format;

/**
 * Custom log levels
 */
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

/**
 * Set log level based on environment
 */
const level = () => {
    return env.NODE_ENV === "development" ? "debug" : "warn";
};

/**
 * Add colors only for console output
 */
const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
};

winston.addColors(colors);

/**
 * Console format (colored, readable)
 */
const consoleFormat = combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    colorize({ all: true }),
    printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level}: ${message}`;
    }),
);

/**
 * File format (clean JSON, no color codes)
 */
const fileFormat = combine(timestamp(), json());

/**
 * Logger instance
 */
export const Logger = winston.createLogger({
    level: level(),
    levels,
    transports: [
        new winston.transports.Console({
            format: consoleFormat,
        }),
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
            format: fileFormat,
        }),
        new winston.transports.File({
            filename: "logs/all.log",
            format: fileFormat,
        }),
    ],
    exitOnError: false,
});
