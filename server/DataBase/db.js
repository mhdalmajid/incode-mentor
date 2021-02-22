/* eslint-disable import/no-extraneous-dependencies */
/// /////////////////////////////////////////////////
// This is a complete test application, which shows
// how to use the following options:
//
// a) override the default promise library;
// b) use pg-monitor to output all the query events;
// c) change the default theme for pg-monitor;
// d) add log handler to pg-monitor, to log events into a file or elsewhere.
//
// Packages used: pg-promise, pg-monitor, bluebird.
/// /////////////////////////////////////////////////

const promise = require('bluebird')

const initOptions = {
	promiseLib: promise,
}

const pgp = require('pg-promise')(initOptions)

const monitor = require('pg-monitor')

monitor.attach(initOptions)

monitor.setTheme('matrix')

monitor.setLog((msg, info) => {
	// save the screen messages into your own log file;
})

const connectionDetails = {
	host: 'localhost',
	port: 5432,
	database: 'inco',
	user: 'postgres',
	password: 'admin',
}

const db = pgp(connectionDetails)

// db.any('select * from users')
//   .then((data) => {

//     console.log('DATA:', data)

// })
//   .catch((error) => {

//     console.log('ERROR:', error)

// })
//   .finally(db.$pool.end)


module.exports = db