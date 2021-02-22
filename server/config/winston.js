/* eslint-disable import/no-extraneous-dependencies */
const winston = require('winston')
const chalk = require('chalk')
// Reset = '\x1b[0m';
// Bright = '\x1b[1m';
// Dim = '\x1b[2m';
// Underscore = '\x1b[4m';
// Blink = '\x1b[5m';
// Reverse = '\x1b[7m';
// Hidden = '\x1b[8m';

// FgBlack = '\x1b[30m';
// FgRed = '\x1b[31m';
// FgGreen = '\x1b[32m';
// FgYellow = '\x1b[33m';
// FgBlue = '\x1b[34m';
// FgMagenta = '\x1b[35m';
// FgCyan = '\x1b[36m';
// FgWhite = '\x1b[37m';

// BgBlack = '\x1b[40m';
// BgRed = '\x1b[41m';
// BgGreen = '\x1b[42m';
// BgYellow = '\x1b[43m';
// BgBlue = '\x1b[44m';
// BgMagenta = '\x1b[45m';
// BgCyan = '\x1b[46m';
// BgWhite = '\x1b[47m';


// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
const level = () => {

  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'

}

// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  http: 'green',
  debug: 'white',
}
const CATEGORY = '🍄'

// Tell winston that you want to link the colors
// defined above to the severity levels.
winston.addColors(colors)

// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
  // winston.format.colorize({ all: true }),
  winston.format.label({ label: CATEGORY }),
  winston.format.splat(),
  winston.format.printf((info) => {

    const { timestamp, message, label, ...args } = info
    let  {level} = info

    switch (level.toUpperCase()) {

      case 'INFO':
        level = chalk.hex('#34ace0').bold(level)
        break

      case 'WARN':
        level = chalk.hex('#ffb142').bold(level)
        break

      case 'ERROR':
        level = chalk.hex('#ff4757').bold(level)
        break

      default:
        break

    }
    return ` ${label}${level}🍄 => ${message}`

})
)

const transports = [

  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
    maxsize: 500,
  }),

  new winston.transports.File({ filename: 'logs/all.log', maxsize: 500 }),
]


const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})


module.exports = Logger







// module.exports = new winston.Logger({
//   transports: [
//     new winston.transports.Console({
//       formatter (options) {

//         let message = ''

//         if (options.message !== undefined) {

//           message = options.message

//         }

//         let meta = ''

//         if (options.meta && Object.keys(options.meta).length) {

//           meta = `\n\t${  JSON.stringify(options.meta)}`

//         }

//         let level = options.level.toUpperCase()

//         switch (level) {

//           case 'INFO':
//             level = chalk.cyan(level)
//             break

//           case 'WARN':
//             level = chalk.yellow(level)
//             break

//           case 'ERROR':
//             level = chalk.red(level)
//             break

//           default:
//             break

// }

//         const output = [`[${  options.timestamp()  }][${  level  }]`, message, meta]

//         return output.join(' ')

// },
//     }),
//   ],
// })