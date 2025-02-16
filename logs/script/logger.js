const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;
const fs = require('fs');
const path = require('path');

// Create log directory if it doesn't exist
const logDir = path.join(__dirname, '../../logs');
fs.mkdirSync(logDir, { recursive: true });

const myFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        errors({ stack: true }),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: path.join(logDir, 'info.log'), level: 'info' }),
        new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
        new transports.File({ filename: path.join(logDir, 'combined.log') })
    ]
});

module.exports = logger;
