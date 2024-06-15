const mongoose = require('mongoose');

const ScrapedDataSchema = new mongoose.Schema({
  name: String,
  description: String,
  companyLogo: String,
  facebookUrl: String,
  linkedinUrl: String,
  twitterUrl: String,
  instagramUrl: String,
  address: String,
  phoneNumber: String,
  email: String
});

module.exports = mongoose.model('ScrapedData', ScrapedDataSchema);
