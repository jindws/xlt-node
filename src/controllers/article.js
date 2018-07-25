const {getResponse} = require('../helpers')

const list = async ctx => {
    const {body} = ctx.request
    const {pageSize,pageNum} = body
    const list = await models.article.find({},{
        title:1,
        content:1,
    })
    .skip(+pageSize*(+pageNum-1))
    .limit(+pageSize)
    .sort({
        create_time:-1,
    })

    const count = await models.article.count()
    ctx.body = getResponse(true, {
        list,
        count,
    })
}

const create = async ctx=>{
    const {body} = ctx.request
    await models.article.create(body)
    ctx.body = getResponse(true, '操作成功')
}

module.exports = {
    list,
    create,
}
