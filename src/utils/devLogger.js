import winston from 'winston';
import fs from 'fs';
import path from 'path';


const logDirectory = path.resolve('./src/logs/');

// Asegúrate de que el directorio de logs exista
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        debug: 'white',
        http: 'magenta'
    }
};

const logger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: path.join(logDirectory, 'errors.log'),
            level: 'http',
            format: winston.format.simple()
        })
    ]
});

export const addDevLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.warning(`${req.method} en ${req.url} - ${new Date().toLocaleString()}`);
    next();
};
