import winston from 'winston';
import fs from 'fs';
import path from 'path';


const logDirectory = path.resolve('./logs');

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
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: path.join(logDirectory, 'errors.log'),
            level: 'warning',
            format: winston.format.simple()
        })
    ]
});

export const addProdLogger = (req, res, next) => {
    req.logger = logger;
    const message = `${req.method} en ${req.url} - ${new Date().toLocaleString()}`;

    req.logger.debug(message);  

    if (req.url.includes('error')) {
        req.logger.error(message);
    } else if (req.url.includes('warn')) {
        req.logger.warning(message);
    } else if (req.url.includes('info')) {
        req.logger.info(message);
    } else if (req.url.includes('debug')) {
        req.logger.http(message);
    } else if (req.url.includes('fatal')) {
        req.logger.fatal(message);
    }

    next();
};
