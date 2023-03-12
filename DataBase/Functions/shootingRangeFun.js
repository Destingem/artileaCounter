const { default: mongoose } = require("mongoose");
const { result } = require("./ResultObj");
const { shootingRangeModel } = require("../Models/shootingRange");

module.exports.addshootingRange = async (data) => {
  try {
    // create new item and save it in the data base
    const shootingRange = new shootingRangeModel({
      ...data,
    });
    const newshootingRange = await shootingRange.save();

    return result(
      false,
      `the shootingRange ${data.name} was added successfuly !`,
      newshootingRange
    );
  } catch (error) {
    // return error if server DB crashed
    return result(
      true,
      `${__dirname} addshootingRange function => ${error.message}`,
      null
    );
  }
};
module.exports.addShootingRangePlace = async (item_id, data) => {
  try {
    const shootingRange = await shootingRangeModel.findOneAndUpdate(
      { _id: item_id },
      { $push:{ "places": data } }
    );

    return result(false, "Place Added", shootingRange);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} ShootingRange function => ${error.message}`,
      null
    );
  }
};
module.exports.deleteShootingRangePlace = async (item_id, data) => {
  try {
    const shootingRange = await shootingRangeModel.findOneAndUpdate(
      { _id: item_id },
      { $pull: { "places": data } }
    );

    return result(false, "ShootingRange Removed", shootingRange);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};

module.exports.addShootingRangeManagers = async (item_id, data) => {
  try {
    const shootingRange = await shootingRangeModel.findOneAndUpdate(
      { _id: item_id },
      { $push:{ "staff.rangeManagers": data } }
    );

    return result(false, "Range Manager Added", shootingRange);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};
module.exports.deleteShootingRangeManagers = async (item_id, data) => {
  try {
    const shootingRange = await shootingRangeModel.findOneAndUpdate(
      { _id: item_id },
      { $pull:  { "staff.rangeManagers": data } }
    );

    return result(false, "Range Manager Removed", shootingRange);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};

module.exports.addShootingRangeOther = async (item_id, data) => {
  try {
    const shootingRange = await shootingRangeModel.findOneAndUpdate(
      { _id: item_id },
      { $push: { "staff.otherStaff": data  } }
    );

    return result(false, "Added !", shootingRange);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} ShootingRangeOther function => ${error.message}`,
      null
    );
  }
};
module.exports.deleteShootingRangeOther = async (item_id, data) => {
  try {
    const shootingRange = await shootingRangeModel.findOneAndUpdate(
      { _id: item_id },
      { $pull:{ "staff.otherStaff": data  } }
    );

    return result(false, "Removed !", shootingRange);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} ShootingRange function => ${error.message}`,
      null
    );
  }
};

module.exports.getshootingRanges = async () => {
  try {
    const shootingRanges = await shootingRangeModel.aggregate([
      {
        $lookup: {
          from: "disciplines",
          localField: "places",
          foreignField: "_id",
          as: "places",
        },
      },
      {
        $lookup: {
          from: "peoples",
          localField: "staff.responsiblePerson",
          foreignField: "_id",
          as: "staff.responsiblePerson",
        },
      },
      {
        $lookup: {
          from: "peoples",
          localField: "staff.rangeManagers",
          foreignField: "_id",
          as: "staff.rangeManagers",
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
    ]);

    return result(false, "all shootingRanges", shootingRanges);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getshootingRanges function => ${error.message}`,
      null
    );
  }
};

module.exports.getshootingRange = async (shootingRangeID) => {
  try {
    const shootingRange = await shootingRangeModel.findById(shootingRangeID);
    return result(false, "get shootingRange", shootingRange);
  } catch (error) {
    return result(
      true,
      `${__dirname} getshootingRange function => ${error.message}`,
      null
    );
  }
};

module.exports.deleteshootingRange = async (shootingRangeID) => {
  // check if the user is admin
  try {
    // delete item and get all it's informations
    let shootingRange = await shootingRangeModel.findOneAndDelete({
      _id: shootingRangeID,
    });
    shootingRange = JSON.stringify(shootingRange);

    // return the result
    return result(
      false,
      "shootingRange deleted successfully !",
      JSON.parse(shootingRange)
    );
  } catch (error) {
    return result(
      true,
      `${__dirname} deleteshootingRange function => ${error.message}`,
      null
    );
  }
};

module.exports.editshootingRange = async (shootingRangeID, data) => {
  try {
    // check if there is any true changes before
    let shootingRangeToEdit = JSON.stringify(
      await shootingRangeModel.findById(shootingRangeID)
    );
    shootingRangeToEdit = JSON.parse(shootingRangeToEdit);
    if (
      shootingRangeToEdit.name === data.name &&
      shootingRangeToEdit.provozovatel === data.provozovatel &&
      shootingRangeToEdit.staff.responsiblePerson ===
        data.staff.responsiblePerson &&
      shootingRangeToEdit.staff.rangeManagers === data.staff.rangeManagers &&
      shootingRangeToEdit.staff.otherStaff === data.staff.otherStaff &&
      shootingRangeToEdit.places.number === data.places.number &&
      shootingRangeToEdit.places.supportedDisciplines ===
        data.places.supportedDisciplines
    )
      return result(
        true,
        `please make some changes before to confirme !`,
        null
      );

    // edit the selected item
    const shootingRange = await shootingRangeModel.findOneAndUpdate(
      { _id: shootingRangeID },
      {
        $set: data,
      }
    );

    return result(false, "shootingRange edited", shootingRange);
  } catch (error) {
    return result(true, `inventory line 120 => ${error.message}`, null);
  }
};

module.exports.getInformation = async () => {
  const totalshootingRanges = await shootingRangeModel.aggregate([
    {
      $group: {
        _id: null,
        total_shootingRanges: { $sum: 1 },
      },
    },
  ]);

  return result(false, "get info", {
    totalshootingRanges,
  });
};
