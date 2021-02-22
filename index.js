/* eslint-disable import/no-extraneous-dependencies */
global.ROOTURL = require('app-root-path')
const { errors } = require('pg-promise')
const createCallsiteRecord = require('callsite-record')
const chalk = require('chalk')
const db = require('./server/DataBase/db')
const app = require('./server/app')
const logger = require("./server/config/winston")


global.db = db





function cleanStackTrace(reason) {

  return createCallsiteRecord({
    forError: reason,
  }).renderSync({
    stackFilter(frame) {

      return !frame.getFileName().includes('node_modules')

},
  })

}

process.on('unhandledRejection', (reason) => {

  console.log(cleanStackTrace(reason))

})


app.listen(app.get('port'),  () => {


        console.log(
          chalk.hex('#f78fb3').bold(
            `
               -------------------------------------------------------------------------------
               --------------------------------- Server restarted ----------------------------
               -------------------------------------------------------------------------------\n`
          )
        )
        logger.info(
          `Server 🚀🚀 and  running  on 👉\x1b[0m http://localhost:${app.get('port')}/\n`
        )

})
