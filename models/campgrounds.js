var mongoose            = require('mongoose');
//SCHEMA SETUP and MODEL(By Using Mongoose)
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
  });
module.exports = mongoose.model("Campground",campgroundSchema);
  