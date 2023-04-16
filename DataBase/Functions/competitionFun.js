const { default: mongoose } = require("mongoose");
const { result } = require("./ResultObj");
const { competitionModel } = require("../Models/competition");
const { peoplesModel } = require("../Models/people");
const { clubsModel } = require("../Models/club");

module.exports.addcompetition = async (data) => {
  try {
    // create new item and save it in the data base
    const competition = new competitionModel({
      ...data,
    });
    const newcompetition = await competition.save();

    return result(
      false,
      `the competition ${data.name} was added successfuly !`,
      newcompetition
    );
  } catch (error) {
    // return error if server DB crashed
    return result(
      true,
      `${__dirname} addcompetition function => ${error.message}`,
      null
    );
  }
};
// Compeitition 1
module.exports.getcompetitions = async () => {
  try {
    const competitions = await competitionModel.aggregate([
      {
        $lookup: {
          from: "peoples",
          localField: "shooters",
          foreignField: "_id",
          as: "shooters",
        },
      },

      {
        $lookup: {
          from: "shootingranges",
          localField: "shootingRanges",
          foreignField: "_id",
          as: "shootingRanges",
        },
      },
      {
        $lookup: {
          from: "peoples",
          localField: "staff.headRefree",
          foreignField: "_id",
          as: "staff.headRefree",
        },
      },
      {
        $lookup: {
          from: "peoples",
          localField: "staff.director",
          foreignField: "_id",
          as: "staff.director",
        },
      },
      {
        $lookup: {
          from: "peoples",
          localField: "staff.refrees",
          foreignField: "_id",
          as: "staff.refrees",
        },
      },
      {
        $lookup: {
          from: "peoples",
          localField: "staff.otherStaff",
          foreignField: "_id",
          as: "staff.otherStaff",
        },
      },
      {
        $lookup: {
          from: "disciplines",
          localField: "shootingRanges.places",
          foreignField: "_id",
          as: "places",
        },
      },
      {
        $lookup: {
          from: "disciplines",
          localField: "disciplines",
          foreignField: "_id",
          as: "disciplines",
        },
      },
      //--------------------------------------------------------------------------------------------------------------------///
      {
        $lookup: {
          from: "peoples",
          localField: "shifts.shootingSessions.shooter",
          foreignField: "_id",
          as: "shifts_shootingSessions_shooter",
        },
      },
      {
        $lookup: {
          from: "disciplines",
          localField: "shifts.shootingSessions.discipline",
          foreignField: "_id",
          as: "shifts_shootingSessions_discipline",
        },
      },
      {
        $lookup: {
          from: "peoples",
          localField: "shifts.shiftRefrees.refrees",
          foreignField: "_id",
          as: "shifts_shiftRefrees_refrees",
        },
      },
      {
        $lookup: {
          from: "shootingranges",
          localField: "shifts.shiftRefrees.shootingRange",
          foreignField: "_id",
          as: "shifts_shiftRefrees_shootingRange",
        },
      },
      {
        $lookup: {
          from: "disciplines",
          localField: "shifts.disciplines",
          foreignField: "_id",
          as: "shifts_disciplines",
        },
      },
      //--------------------------------------------------------------------------------------------------------------------///

      {
        $unwind: {
          path: "$shifts",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$shifts.shootingSessions",
          preserveNullAndEmptyArrays: true,
        },
      },
     
      {
        $lookup: {
          from: "peoples",
          localField: "shifts.shootingSessions.shooter",
          foreignField: "_id",
          as: "matchedShooter",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "matchedShooter.userId",
          foreignField: "_id",
          as: "matchedUser",
        },
      },

      {
        $lookup: {
          from: "disciplines",
          localField: "shifts.shootingSessions.discipline",
          foreignField: "_id",
          as: "matchedDiscipline",
        },
      },
      {
        $lookup: {
          from: "disciplines",
          localField: "shifts.shootingSessions.discipline",
          foreignField: "_id",
          as: "matchedDiscipline",
        },
      },
      
      {
        $addFields: {
          shootingRangesObject: {
            shooter: { $arrayElemAt: ["$matchedShooter", 0] },
            user: { $arrayElemAt: ["$matchedUser", 0] }, // Add user details here
            discipline: { $arrayElemAt: ["$matchedDiscipline", 0] },
            notes: "$shifts.shootingSessions.notes",
            place: "$shifts.shootingSessions.place",
            shootingSessions: "$shifts.shootingSessions",
            shiftNumber: "$shifts.shiftNumber",
          },
        },
      },

      
      {
        $addFields: {
          Shiftref: {
            refrees: "$shifts_shiftRefrees_refrees",
            shootingRange: "$shifts_shiftRefrees_shootingRange",
            start: "$shifts.shiftRefrees.start",
            end: "$shifts.shiftRefrees.end",
          },
        },
      },

      {
        $group: {
          _id: { _id: "$_id", shiftNumber: "$shootingRangesObject.shiftNumber" },
          name: { $first: "$name" },
          description: { $first: "$description" },
          startDate: { $first: "$startDate" },
          endDate: { $first: "$endDate" },
          shootingSessions: { $push: "$shootingRangesObject" },
          shiftStartDate: { $first: "$shifts.shiftRefrees.start" },
          shiftEndDate: { $first: "$shifts.shiftRefrees.end" },
          staff: { $first: "$staff" },
          shootingRanges: { $first: "$shootingRanges" },
          disciplines: { $first: "$disciplines" },
          shooters: { $first: "$shooters" },
        },
      },
      
      {
        $group: {
          _id: "$_id._id",
          name: { $first: "$name" },
          description: { $first: "$description" },
          startDate: { $first: "$startDate" },
          endDate: { $first: "$endDate" },
          shifts: {
            $push: {
              shiftNumber: "$_id.shiftNumber",
              shootingSessions: "$shootingSessions",
              start: "$shiftStartDate",
              end: "$shiftEndDate",
            },
          },
          staff: { $first: "$staff" },
          shootingRanges: { $first: "$shootingRanges" },
          disciplines: { $first: "$disciplines" },
          shooters: { $first: "$shooters" },
        },
      },
       
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          startDate: 1,
          endDate: 1,
          shifts: 1,
          staff: 1,
          shootingRanges: 1,
          disciplines: 1,
          shooters: 1,
        },
      },
    ]);
    return result(false, "all competitions", competitions);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getcompetitions function => ${error.message}`,
      null
    );
  }
};

//--------------------------------------------------------------------//
module.exports.addshootingRanges = async (item_id, data) => {
  try {
    const Comp = await competitionModel.findOneAndUpdate(
      { _id: item_id },
      { $push: { shootingRanges: data } }
    );

    return result(false, "shootingRanges Added", Comp);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};
module.exports.deleteshootingRanges = async (item_id, data) => {
  try {
    const Comp = await competitionModel.findOneAndUpdate(
      { _id: item_id },
      { $pull: { shootingRanges: data } }
    );

    return result(false, "Removed", Comp);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};
module.exports.addshooters = async (item_id, data) => {
  try {
    console.log(item_id);
    console.log(data);
    const Comp = await competitionModel.findOneAndUpdate(
      { _id: item_id },
      { $push: { shooters: data } }
    );

    return result(false, "shooters Added", Comp);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};
module.exports.deleteshooters = async (item_id, data) => {
  try {
    const Comp = await competitionModel.findOneAndUpdate(
      { _id: item_id },
      { $pull: { shooters: data } }
    );

    return result(false, "Removed", Comp);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};
module.exports.adddisciplines = async (item_id, data) => {
  try {
    const Comp = await competitionModel.findOneAndUpdate(
      { _id: item_id },
      { $push: { disciplines: data } }
    );

    return result(false, "disciplines Added", Comp);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};
module.exports.deletedisciplines = async (item_id, data) => {
  try {
    const Comp = await competitionModel.findOneAndUpdate(
      { _id: item_id },
      { $pull: { disciplines: data } }
    );

    return result(false, "Removed", Comp);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};
module.exports.adddstaff = async (item_id, data) => {
  try {
    const Comp = await competitionModel.findOneAndUpdate(
      { _id: item_id },
      { $set: { staff: data } },
      { upsert: true, new: true }
    );

    return result(false, "staff Added", Comp);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};
module.exports.deletestaff = async (item_id, data) => {
  try {
    const Comp = await competitionModel.findOneAndUpdate(
      { _id: item_id },
      { $pull: { staff: data } }
    );

    return result(false, "Removed", Comp);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};
module.exports.adddstaffREF = async (item_id, data) => {
  try {
    const Comp = await competitionModel.findOneAndUpdate(
      { _id: item_id },
      { $push: { "staff.refrees": data } }
    );

    return result(false, "refrees Added", Comp);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};
module.exports.deletestaffREF = async (item_id, data) => {
  try {
    const Comp = await competitionModel.findOneAndUpdate(
      { _id: item_id },
      { $pull: { "staff.refrees": data } }
    );

    return result(false, "Removed", Comp);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};
module.exports.adddstaffOther = async (item_id, data) => {
  try {
    const Comp = await competitionModel.findOneAndUpdate(
      { _id: item_id },
      { $push: { "staff.otherStaff": data } }
    );

    return result(false, "otherStaff Added", Comp);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};
module.exports.deletestaffOther = async (item_id, data) => {
  try {
    const Comp = await competitionModel.findOneAndUpdate(
      { _id: item_id },
      { $pull: { "staff.otherStaff": data } }
    );

    return result(false, "Removed", Comp);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};
// shift add
module.exports.adddshifts = async (item_id, data) => {
  try {
    const Comp = await competitionModel.findOneAndUpdate(
      { _id: item_id },
      { $push: { shifts: data } }
    );

    return result(false, "shifts Added", Comp);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};
module.exports.deleteshifts = async (item_id, data) => {
  try {
    const Comp = await competitionModel.findOneAndUpdate(
      { _id: item_id },
      { $pull: { shifts: data } }
    );

    return result(false, "Removed", Comp);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};
//-------------------------------------------------------------------//
module.exports.getcompetition = async (competitionID) => {
  try {
    const competition = await competitionModel.findById(competitionID);
    return result(false, "get competition", competition);
  } catch (error) {
    return result(
      true,
      `${__dirname} getcompetition function => ${error.message}`,
      null
    );
  }
};

module.exports.deletecompetition = async (competitionID) => {
  // check if the user is admin
  try {
    // delete item and get all it's informations
    let competition = await competitionModel.findOneAndDelete({
      _id: competitionID,
    });
    competition = JSON.stringify(competition);

    // return the result
    return result(
      false,
      "competition deleted successfully !",
      JSON.parse(competition)
    );
  } catch (error) {
    return result(
      true,
      `${__dirname} deletecompetition function => ${error.message}`,
      null
    );
  }
};

module.exports.editcompetition = async (competitionID, data) => {
  try {
    // check if there is any true changes before
    let competitionToEdit = JSON.stringify(
      await competitionModel.findById(competitionID)
    );
    competitionToEdit = JSON.parse(competitionToEdit);
    if (
      competitionToEdit.name === data.name &&
      competitionToEdit.description === data.description &&
      competitionToEdit.shifts === data.shifts &&
      competitionToEdit.staff === data.staff &&
      competitionToEdit.shootingRanges === data.shootingRanges &&
      competitionToEdit.disciplines === data.disciplines &&
      competitionToEdit.shooters === data.shooters
    )
      return result(
        true,
        `please make some changes before to confirme !`,
        null
      );

    // edit the selected item
    const competition = await competitionModel.findOneAndUpdate(
      { _id: competitionID },
      {
        $set: data,
      }
    );

    return result(false, "competition edited", competition);
  } catch (error) {
    return result(true, `inventory line 120 => ${error.message}`, null);
  }
};

module.exports.getInformation = async () => {
  const totalcompetitions = await competitionModel.aggregate([
    {
      $group: {
        _id: null,
        total_competitions: { $sum: 1 },
      },
    },
  ]);

  return result(false, "get info", {
    totalcompetitions,
  });
};
module.exports.editResult = async (competitionID, shootingSessionID, data) => {
  try {
    // Find the competition by ID and update the result field in the specified shooting session
    const updatedCompetition = await competitionModel.findOneAndUpdate(
      {
        _id: competitionID,
        "shifts.shootingSessions._id": shootingSessionID,
      },
      {
        $set: {
          "shifts.$[].shootingSessions.$[session].results": data,
        },
      },
      {
        arrayFilters: [{ "session._id": shootingSessionID }],
        new: true,
      }
    );

    if (!updatedCompetition) {
      return result(true, "Competition or shooting session not found" + " competitionID:" + competitionID + " shootingSessionID:" + shootingSessionID + " data:" + data, null);
    }

    return result(false, "Result updated successfully", updatedCompetition);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} editResult function => ${error.message}`,
      null
    );
  }
};

