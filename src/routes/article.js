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
 * @post '/api/article/operate'
 */
router.post('/operate', Article.operate)

/*
 * @post '/api/article/main'
 */
router.post('/main', Article.main)



module.exports = router
