const mongoose = require('mongoose');

const healthPackageSchema = new mongoose.Schema({
  name: { type: String },
  gender: { type: String },
  price: { type: Number },
  discountPrice: { type: Number },
  text1: { type: String },
  text2: { type: String },
  text3: { type: String },
  text4: { type: String },
  text5: { type: String },
  text6: { type: String },
  text7: { type: String },
  text8: { type: String },
  text9: { type: String },
  text10: { type: String },
  text11: { type: String },
  text12: { type: String },
  text13: { type: String },
  text14: { type: String },
  text15: { type: String },
  text16: { type: String },
  text17: { type: String },
  text18: { type: String },
  text19: { type: String },
  text20: { type: String },
});

const HealthPackage = mongoose.model('HealthPackage', healthPackageSchema);

module.exports = HealthPackage;
