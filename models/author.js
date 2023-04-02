// import mongoose
// mongoose is the namespace of all the functions/classes that was exported from mongoose lib
const mongoose = require('mongoose'); 

// define Schema class shorthand
const Schema = mongoose.Schema; 

// create a author schema
const AuthorSchema = new Schema({
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date}
})

// Virtual for full name
    // I want to add a property that can be called in individual document that get's user's fullname
AuthorSchema.virtual("name").get(function() {
    let fullname = ""

    if (this.first_name && this.family_name) {
        fullname = `${this.first_name}, ${this.family_name}`
    }
    
    if (!this.first_name || !this.family_name) {
        fullname = "";
    }
    return fullname;
})

// Virtual for url
AuthorSchema.virtual('url').get(function() {
    return `/catalog/author/${this._id}`;  // _id is the default auto generated id
})

// export model
module.exports