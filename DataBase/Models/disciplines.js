const { default: mongoose } = require("mongoose");

const shots = new mongoose.Schema({
  competitionShots: Number,
  isLimitedPreparation: { type: Boolean, default: false },
  preparationLimit: Number,
  maxShot: Number,
  minShot: Number,
});
const timeSequences = new mongoose.Schema({
  name: String,
  time: String,
  isnumOfShotsLimited: { type: Boolean, default: false },
  numberOfShots: Number,
});

const final = new mongoose.Schema({
  doesHaveFinal: { type: Boolean, default: false },
  timeSequences: timeSequences,
});

const guns = new mongoose.Schema({
  pistol: Boolean,
  rifle: Boolean,
  crossbow: Boolean,
  other: String,
});
const timeDetails = new mongoose.Schema({
  total: Number,
  forPreparation: Number,
  forPractice: Number,
  forCompetition: Number,
});
const time = new mongoose.Schema({
  onRegular: timeDetails,
  onElectronic: timeDetails,
  onMigratory: timeDetails,
  other: [timeDetails],
});

const disciplinesSchema = new mongoose.Schema({
  name: String,
  defedesion: String,
  time: time,
  guns: guns,
  final: final,
  shots: shots,
});

module.exports.disciplinesModel = mongoose.model(
  "disciplines",
  disciplinesSchema
);
