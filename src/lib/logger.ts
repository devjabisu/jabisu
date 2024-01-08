// import winston from "winston";
//
// const createLogger = (filename: string) => {
//   return winston.createLogger({
//     level: "debug",
//     format: winston.format.combine(
//       winston.format.timestamp(),
//       winston.format.json(),
//       winston.format.label({ label: filename }),
//     ),
//     transports: [
//       new winston.transports.Console(),
//       new winston.transports.File({ filename: "logs/helper.log" }),
//     ],
//   });
// };
//
// export { createLogger };

const logger = require("pino")();

const createLogger = (filename: string) => {
  return logger.child({ filename });
};

export { createLogger };
