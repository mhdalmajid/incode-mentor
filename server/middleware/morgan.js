/* eslint-disable import/no-extraneous-dependencies */

const morgan = require('morgan')
const chalk = require('chalk')
const Logger = require('../config/winston')

const {StreamOptions} = morgan
// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream = {
  // Use the http severity
  write: (message) => Logger.http(message),
}

// Skip all the Morgan http log if the
// application is not running in development mode.
// This method is not really needed here since
// we already told to the logger that it should print
// only warning and error messages in production.
const skip = () => {

  const env = process.env.NODE_ENV
  return env !== 'development'

}

// Build the morgan middleware
// const morganMiddleware = morgan(
//   ':method :url :status :res[content-length] :response-time ms',
//   { stream, skip }
// )

const morganMiddleware = morgan(
  (tokens, req, res) =>
    [
      // '\n\n',
      // chalk.hex('#ff4757').bold('🍄Morgan --> '),
      chalk.hex('#34ace0').bold(tokens.method(req, res)),
      chalk.hex('#ffb142').bold(tokens.status(req, res)),
      chalk.hex('#ff5252').bold(tokens.url(req, res)),
      chalk.hex('#2ed573').bold(`${tokens['response-time'](req, res)} ms`),
      // chalk.hex('#f78fb3').bold(`@ ${tokens.date(req, res)}`),
      // chalk.yellow(tokens['remote-addr'](req, res)),
      // chalk.hex('#fffa65').bold(`from ${tokens.referrer(req, res)}`),
      // chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
      '\n\n',
      chalk
        .hex('#f78fb3')
        .bold(`--------------------------------- New Log ------------------------------`),
    ].join(' '),
  { stream, skip }
)

module.exports =  morganMiddleware
