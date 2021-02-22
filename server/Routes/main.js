const router = require('express').Router()
const userRouter = require('./User.Router')

router.get('/', (req, res, next) => {


	res.render('index')

})

router.get('/', userRouter)

module.exports = router
