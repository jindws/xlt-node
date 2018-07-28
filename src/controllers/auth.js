const {getResponse} = require('../helpers')
const urllib = require('urllib')

const login = async ctx=>{
    const session_key = await jscode2session(ctx)

    ctx.body = getResponse(true, {
        session_key
    })
}

const jscode2session = async ctx=>{
    const {body} = ctx.request
    const {code} = body

    return new Promise(async resolve=>{
        await urllib.request(`https://api.weixin.qq.com/sns/jscode2session?appid=wxb77780bd66657b84&secret=5a1e4e7ea55504d7e8a70a2a9acedda7&js_code=${code}&grant_type=authorization_code`, async (err, data, res)=>{
            const {openid,session_key} = JSON.parse(data.toString())

            const had = await models.user.findOne({
                openid,
                is_delete:false,
            })

            if(!had){//新用户
                await models.user.create({
                    openid,
                    session_key,
                })
            }else{
                await models.user.findOneAndUpdate({
                    openid,
                    is_delete:false,
                },{
                    session_key,
                })
            }

            resolve(session_key)
        })
    })
}

const updateauth = async ctx=>{
    const {body} = ctx.request
    const {userInfo,session_key} = body

    await models.user.findOneAndUpdate({
        session_key,
    },{
        wx:userInfo,
    })
    ctx.body = getResponse(true, '操作成功')
}

module.exports = {
    login,
    updateauth,
}
