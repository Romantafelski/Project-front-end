const mongoose = require("mongoose")

const frontSchema = new mongoose.Schema ({
    title: String,
    text: String,
    image: String
})

const Schema = mongoose.model("Schema", frontSchema)

module.exports = Schema