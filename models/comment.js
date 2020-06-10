const mongoose = require("mongoose");

const Schema = mongoose.Schema

const commentSchema = new Schema({
    Comment: {type: String},
})

var Comment = mongoose.model("Comment" , commentSchema)

module.exports = Comment