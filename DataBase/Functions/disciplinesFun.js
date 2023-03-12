const { default: mongoose } = require("mongoose");
const { result } = require("./ResultObj");
const { disciplinesModel }= require("../Models/disciplines");

module.exports.adddisciplines = async (data) => {
  try {
    // create new item and save it in the data base
    const disciplines = new disciplinesModel({
      ...data,
    });
    const newdisciplines = await disciplines.save();

    return result(
      false,
      `the disciplines ${data.name} was added successfuly !`,
      newdisciplines
    );
  } catch (error) {
    // return error if server DB crashed
    return result(
      true,
      `${__dirname} adddisciplines function => ${error.message}`,
      null
    );
  }
};

module.exports.getdisciplines = async () => {
  try {
    const disciplines = await disciplinesModel.find()

    return result(false, "all disciplines", disciplines);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getdisciplines function => ${error.message}`,
      null
    );
  }
};

module.exports.addfinal = async (item_id, data) => {
  try {
    const shootingRange = await disciplinesModel.findOneAndUpdate(
      { _id: item_id },
      { $set:{ "final": data } }
    );
    return result(false, "Final Added", shootingRange);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};
module.exports.addonregular = async (item_id, data) => {
  try {
    const shootingRange = await disciplinesModel.findOneAndUpdate(
      { _id: item_id },
      { $set: { "time.onRegular": data } },
    );
    return result(false, "On regular Added", shootingRange);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} Onre gular function => ${error.message}`,
      null
    );
  }
};
module.exports.addonElectronic = async (item_id, data) => {
  try {
    const shootingRange = await disciplinesModel.findOneAndUpdate(
      { _id: item_id },
      { $set:{ "time.onElectronic": data }},
      { new: true }
    );

    return result(false, "Electronic Added", shootingRange);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};
module.exports.addonMigratory = async (item_id, data) => {
  try {
    const shootingRange = await disciplinesModel.findOneAndUpdate(
      { _id: item_id },
      { $set:{ "time.onMigratory": data } },

    );

    return result(false, "Migratory Added", shootingRange);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};
module.exports.addonother = async (item_id, data) => {
  try {
    const shootingRange = await disciplinesModel.findOneAndUpdate(
      { _id: item_id },
      { $push:{ "time.other": data } }
    );

    return result(false, "Other Added", shootingRange);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};
module.exports.deleteOther = async (item_id, data) => {
  try {
    const shootingRange = await disciplinesModel.findOneAndUpdate(
      { _id: item_id },
      { $pull: { "time.other": data } }
    );

    return result(false, "Removed", shootingRange);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};

module.exports.getdiscipline = async (disciplinesID) => {
  try {
    const disciplines =  await disciplinesModel.findById(disciplinesID)
    return result(false, "get disciplines", disciplines);
  } catch (error) {
    return result(
      true,
      `${__dirname} getdisciplines function => ${error.message}`,
      null
    );
  }
};

module.exports.deletedisciplines = async (disciplinesID) => {
  // check if the user is admin
  try {
    // delete item and get all it's informations
    let disciplines = await disciplinesModel.findOneAndDelete({ _id: disciplinesID });
    disciplines = JSON.stringify(disciplines);



    // return the result
    return result(false, "disciplines deleted successfully !", JSON.parse(disciplines));
  } catch (error) {
    return result(
      true,
      `${__dirname} deletedisciplines function => ${error.message}`,
      null
    );
  }
};

module.exports.editdisciplines = async (disciplinesID, data) => {
  try {
    // check if there is any true changes before
    let disciplinesToEdit = JSON.stringify(await disciplinesModel.findById(disciplinesID));
    disciplinesToEdit = JSON.parse(disciplinesToEdit);
    if (
      disciplinesToEdit.name === data.name &&
      disciplinesToEdit.defedesion === data.defedesion &&
      disciplinesToEdit.time === data.time &&
      disciplinesToEdit.guns === data.guns &&
      disciplinesToEdit.final === data.final &&
      disciplinesToEdit.shots === data.shots
    )
      return result(
        true,
        `please make some changes before to confirme !`,
        null
      );

    // edit the selected item
    const disciplines = await disciplinesModel.findOneAndUpdate(
      { _id: disciplinesID },
      {
        $set: data,
      }
    );

    return result(false, "disciplines edited", disciplines);
  } catch (error) {
    return result(true, `inventory line 120 => ${error.message}`, null);
  }
};


module.exports.getInformation = async () => {
  const totaldisciplines = await disciplinesModel.aggregate([
    {
      $group: {
        _id: null,
        total_disciplines: { $sum: 1 },
      },
    },
  ]);

  return result(false, "get info", {
    totaldisciplines,
  });
}


