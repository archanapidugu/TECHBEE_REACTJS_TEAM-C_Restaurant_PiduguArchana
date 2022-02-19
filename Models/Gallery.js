const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

//Defining the Schema
const GallerySchema = new Schema({
  image: { type: String, required: true },
});
const Gallery = mongoose.model("Gallery", GallerySchema);
module.exports = { Gallery };
