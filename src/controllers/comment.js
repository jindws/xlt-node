const {getResponse} = require('../helpers')
const moment = require('moment')

const Create = async ctx=>{
    const {body} = ctx.request
    const {comment,article_id} = body
    const {user} = ctx.state
    const {wx} = user
    let main = await models.comment.create({
        user_id:user._id,
        user_name:wx.nickName,
        headimage:wx.avatarUrl,
        comment,
        article_id,
    })

    ctx.body = getResponse(true, '操作成功')
}

const List = async ctx=>{
    const {body} = ctx.request
    const {article_id} = body

    if(!article_id){
        ctx.body = getResponse(false, 'e001')
        return
    }
    let list = await models.comment.find({
        article_id,
        is_delete:false,
    },{
        create_time:1,
        headimage:1,
        user_name:1,
        comment:1,
        _id:0,
    }).sort({
        create_time:-1,
    })

    list = list.map(itm=>{
        itm = JSON.parse(JSON.stringify(itm))
        itm.create_time = moment(itm.create_time).format("YYYY-MM-DD HH:mm")
        return itm
    })


    ctx.body = getResponse(true, {
        list,
    })
}

module.exports = {
    Create,
    List,
}
