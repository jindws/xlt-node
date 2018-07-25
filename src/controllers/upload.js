const {getResponse} = require('../helpers')

const create = async ctx =>{
      const {path} = ctx.request.files[0]

      ctx.body = getResponse(true,{
          src:path,
      })
}

module.exports = {
    create,
}
