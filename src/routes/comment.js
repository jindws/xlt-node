const Router = require('koa-router')
const Comment = require('../controllers/comment')

const router = Router({
    prefix: '/api/comment'
})

/**
 * @post '/api/comment/list'
 */
router.post('/list', Comment.List)

/*
 * @post '/api/comment/create'
 */
router.post('/create', Comment.Create)

module.exports = router
