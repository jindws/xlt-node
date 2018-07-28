const model = {
    name: 'user',
    schema: {
        phone: String,
        openid:String,
        session_key:String,
        wx:{},
        create_time: {
            type: Number,
            default: Date.now,
        },
        is_delete: {
            type: Boolean,
            default: false
        }
    }
}

module.exports = model
