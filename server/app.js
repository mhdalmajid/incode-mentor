/* eslint-disable import/no-extraneous-dependencies */
const express = require("express")
const path = require("path")
const createError = require("http-errors")
const createCallsiteRecord = require("callsite-record")

const morganMiddleware = require("./middleware/morgan")
const logger = require("./config/winston")
const { logErrors, clientErrorHandler } = require("./middleware/error.js")

const routes = require("./Routes/main")

/** ===========================
 *
 *    Application setup
 *
 * ===========================
 */
const app = express()

app.set("port", process.env.PORT || 3000)
app.set("env", process.env.NODE_ENV)

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "../views"))


app.use(express.static(path.join(__dirname, "./public")))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(morganMiddleware)

/** ================================
 *
 *      Router Setup
 *
 * ================================
 */

app.use(routes)

/** ================================
 *
 *      Error Handlers
 *
 * =================================
 */
app.use(logErrors)
app.use(clientErrorHandler)

app.use((req, res, next) => {

	next(createError(404))

})

app.use((err, req, res, next) => {

	res.locals.message = err.message
	res.locals.error = req.app.get("env") === "development" ? err : {}

	const record = createCallsiteRecord({ forError: err })
	console.log(
		record.renderSync({
			stackFilter: (frame) => frame.getFileName().indexOf(path.sep) > -1,
		})
	)

	logger.error(err.message, { url: req.originalUrl })

	res.status(err.status || 500)
	res.render("pages/error")

})

module.exports = app
