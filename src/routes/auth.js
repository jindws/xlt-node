const Router = require('koa-router')
const Auth = require('../controllers/auth')

const router = Router({
    prefix: '/api/auth'
})

/**
 * @post /api/auth/login
 */
router.post('/login', Auth.login)


/**
 * @post /api/auth/updateauth
 */
router.post('/updateauth', Auth.updateauth)


module.exports = router
