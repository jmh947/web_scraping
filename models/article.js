const mongoose = require("mongoose")

const Schema = mongoose.Schema

const articleSchema = new Schema({
    Headline: {type: String},
    Summary: {type: String},
    URL: {type: String},
    Image: {type: String},
    Saved: {type: Boolean, default: false},
    Comment: [{type: Schema.Types.ObjectId, ref: "Comment"}]
})

var Article = mongoose.model("Article", articleSchema)

module.exports = Article