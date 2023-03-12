const { default: mongoose } = require("mongoose");
const Identificators = new mongoose.Schema({
  firearmLicence:String,
  refreeLincense: String,
  trainerLicense: String,
  _id: false,
  id: false,
});
const peoplesSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  dateOfBirth: String,
  nationality: String,
  phone: String,
  email: String,
  Identificators: Identificators,
  club: {
    type: mongoose.Types.ObjectId,
    ref: "clubs",
  },
});

module.exports.peoplesModel = mongoose.model("peoples", peoplesSchema);
