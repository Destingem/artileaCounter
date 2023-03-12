const { default: mongoose } = require("mongoose");

const clubsSchema = new mongoose.Schema({
    name: String,
    nationality: String,
    organization: String,
    phone: String,
    email: String,
    members: [mongoose.Types.ObjectId],
});

module.exports.clubsModel = mongoose.model("clubs", clubsSchema);
