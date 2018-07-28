const {getResponse} = require('../helpers')
const moment = require('moment')

const list = async ctx => {
    const {body} = ctx.request
    const {pageSize,pageNum} = body
    let list = await models.article.find({},{
        title:1,
        content:1,
        create_time:1,
    })
    .skip(+pageSize*(+pageNum-1))
    .limit(+pageSize)
    .sort({
        create_time:-1,
    })

    const count = await models.article.count()

    list = list.map(itm=>{
        itm = JSON.parse(JSON.stringify(itm))
        itm.create_time = moment(itm.create_time).format("YYYY-MM-DD HH:mm")
        return itm
    })

    ctx.body = getResponse(true, {
        list,
        count,
    })
}

const create = async ctx=>{
    const {body} = ctx.request
    const {title} = body
    const {user} = ctx.state
    if(!title){
        ctx.body = getResponse(false, 'e001')
        return
    }
    const {wx={}} = user
    await models.article.create({
        ...body,
        user_id:user._id,
        user_name:wx.nickname,
        headimage:wx.headimage,
    })
    ctx.body = getResponse(true, '操作成功')
}

module.exports = {
    list,
    create,
}
