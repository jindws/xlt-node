const model = {
    name: 'comment', // 指定数据库中的collection
    schema: {
        user_id:String,
        user_name:String,
        headimage:String,
        comment:String,
        article_id:String,
        create_time:{
            type:Number,
            default:Date.now,
        },
        is_delete: {
            type: Boolean,
            default: false
        }
    }
}

module.exports = model
