const mongoose = require('mongoose')
const { mongoUri,mongoUriParam} = require('../../config')

mongoose.Promise = global.Promise

const conn = mongoose.createConnection(`${mongoUri}/xlt?${mongoUriParam}`)

const db = {}

const log = require('./log')
const article = require('./article')
const user = require('./user')

const models = [
	log,
	article,
	user,
]

for (model of models) {
    const newSchema = new mongoose.Schema(typeof model.schema === 'function'&& model.schema(mongoose.Schema) || model.schema, { collection: model.name })
    db[model.name] = conn.model(model.name, newSchema)
}

module.exports = db
