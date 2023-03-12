const { default: mongoose } = require("mongoose")

const staff = new mongoose.Schema({
  responsiblePerson:mongoose.Types.ObjectId,
  rangeManagers:[mongoose.Types.ObjectId],
  otherStaff:[mongoose.Types.ObjectId]
});

const shootingRangeSchema = new mongoose.Schema({
  name: String,
  provozovatel: String,
  staff:staff,
  places:[mongoose.Types.ObjectId]
});

module.exports.shootingRangeModel = mongoose.model("shootingRange", shootingRangeSchema);