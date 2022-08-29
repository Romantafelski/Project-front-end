const mongoose = require("mongoose")

const frontSchema = new mongoose.Schema ({
    meme: string 
    
})

const Schema = mongoose.model("Schema", frontSchema)

module.exports = Schema