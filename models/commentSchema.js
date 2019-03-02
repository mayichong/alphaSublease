var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String,
        Fname: String,
        Sname: String
    }
});

module.exports = mongoose.model("Comment",commentSchema);