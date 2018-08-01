const {getResponse} = require('../helpers')
const urllib = require('urllib')
const WXBizDataCrypt = require('../helpers/WXBizDataCrypt')

// const appid = ''
// const secret = ''


const login = async ctx=>{
    const session_id = await jscode2session(ctx)

    const user = await models.user.findById(session_id,{
        wx:1,
    })

    ctx.body = getResponse(true, {
        session_id,
        userInfo:user.wx,
    })
}

const jscode2session = async ctx=>{
    const {body} = ctx.request
    const {code} = body

    return new Promise(async resolve=>{
        await urllib.request(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`, async (err, data, res)=>{
            const {openid,session_key} = JSON.parse(data.toString())
            console.log(JSON.parse(data.toString()))

            let _id

            const had = await models.user.findOne({
                openid,
                is_delete:false,
            })

            if(!had){//新用户
                const user = await models.user.create({
                    openid,
                    session_key,
                })
                _id = user._id
            }else{
                await models.user.findOneAndUpdate({
                    openid,
                    is_delete:false,
                },{
                    session_key,
                })
                _id = had._id
            }

            resolve(_id)
        })
    })
}

const updateauth = async ctx=>{
    const {body} = ctx.request
    const {userInfo,session_id,encryptedData,iv} = body
    const {user} = ctx.state

    const pc = new WXBizDataCrypt(appid, user.session_key)

    const data = pc.decryptData(encryptedData , iv)

    // console.log(data)

    await models.user.findOneAndUpdate({
        _id:session_id,
    },{
        // wx:userInfo,
        wx:data,
    })
    ctx.body = getResponse(true, '操作成功')
}

module.exports = {
    login,
    updateauth,
}
