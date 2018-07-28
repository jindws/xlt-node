const Router = require('koa-router')
const Article = require('../controllers/article')

const router = Router({
    prefix: '/api/article'
})

/**
 * @post '/api/article/list'
 */
router.post('/list', Article.list)

/*
 * @post '/api/article/create'
 */
router.post('/create', Article.create)



module.exports = router
