const {getResponse} = require('../helpers')
const moment = require('moment')

const list = async ctx => {
    const {body} = ctx.request
    const {pageSize,pageNum} = body
    let list = await models.article.find({},{
        title:1,
        content:1,
        create_time:1,
        user_name:1,
        headimage:1,
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

const operate = async ctx=>{
    const {body} = ctx.request
    const {title,content,_id} = body
    if(!title){
        ctx.body = getResponse(false, 'e001')
        return
    }
    const {user} = ctx.state
    if(!_id){

        const {wx={}} = user
        await models.article.create({
            ...body,
            user_id:user._id,
            user_name:wx.nickName,
            headimage:wx.avatarUrl,
        })
    }else{
        const check = await models.article.findOne({
            _id,
            user_id:user._id,
        })
        if(check){
            await models.article.findByIdAndUpdate(_id,{
                title,
                content,
            })
        }else{
            ctx.body = getResponse(false, 'e100')
            return
        }
    }

    ctx.body = getResponse(true, '操作成功')
}

const main = async ctx=>{
    const {body} = ctx.request
    const {_id} = body
    const {user} = ctx.state
    let main = await models.article.findById(_id,{
        user_name:1,
        headimage:1,
        title:1,
        content:1,
        crete_time:1,
        user_id:1,
    })

    main = JSON.parse(JSON.stringify(main))
    main.create_time = moment(main.create_time).format("YYYY-MM-DD HH:mm")

    ctx.body = getResponse(true, {
        ...main,
        author:String(user._id) === main.user_id,
    })
}

module.exports = {
    list,
    operate,
    main,
}
