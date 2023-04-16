const { default: mongoose } = require("mongoose");

const shiftRefrees = new mongoose.Schema({
  refrees: [mongoose.Types.ObjectId],
  shootingRange: mongoose.Types.ObjectId,
  start: String,
  end: String,
});


const shootingSessions = new mongoose.Schema({
  shooter: mongoose.Types.ObjectId,
  discipline: mongoose.Types.ObjectId,
  notes: String,
  place: Number,
  results: [Number],
});
const shifts = new mongoose.Schema({
  shiftNumber: Number,
  shootingSessions: [shootingSessions],
  shiftRefrees: [shiftRefrees],
  disciplines: [mongoose.Types.ObjectId],
  _id: false,
  id: false,
});

const staff = new mongoose.Schema({
  headRefree: mongoose.Types.ObjectId,
  director: mongoose.Types.ObjectId,
  refrees: [mongoose.Types.ObjectId],
  otherStaff: [mongoose.Types.ObjectId],
  _id: false,
  id: false,

});

const competitionSchema = new mongoose.Schema({
  name: String,
  description: String,
  startDate: String,
  endDate: String,
  shifts: [shifts],
  staff: staff,
  shootingRanges: [mongoose.Types.ObjectId],
  disciplines: [mongoose.Types.ObjectId],
  shooters: [mongoose.Types.ObjectId],
});

module.exports.competitionModel = mongoose.model(
  "competition",
  competitionSchema
);
