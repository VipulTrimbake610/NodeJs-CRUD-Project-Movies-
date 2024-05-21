const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Movie = new Schema({
    name:{
        type:String,
        require:true,
    },
    img:{
        type:String,
        require:true,
    },
    summary:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('movies',Movie);