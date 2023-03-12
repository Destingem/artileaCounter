const { default: mongoose } = require("mongoose");
const { result } = require("./ResultObj");
const { peoplesModel }= require("../Models/people");

module.exports.addpeople = async (data) => {
  try {
    // create new item and save it in the data base
    const people = new peoplesModel({
      ...data,
    });
    const newpeople = await people.save();

    return result(
      false,
      `the people ${data.name} was added successfuly !`,
      newpeople
    );
  } catch (error) {
    // return error if server DB crashed
    return result(
      true,
      `${__dirname} addpeople function => ${error.message}`,
      null
    );
  }
};

module.exports.getpeoples = async () => {
  try {
    const peoples = await peoplesModel.aggregate([
      {
        $lookup: {
          from: "club",
          localField: "club",
          foreignField: "_id",
          as: "club",
        },
      },

     ]);

    return result(false, "all peoples", peoples);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getpeoples function => ${error.message}`,
      null
    );
  }
};

module.exports.getpeople = async (peopleID) => {
  try {
    const people =  await peoplesModel.findById(peopleID)
    return result(false, "get people", people);
  } catch (error) {
    return result(
      true,
      `${__dirname} getpeople function => ${error.message}`,
      null
    );
  }
};

module.exports.deletepeople = async (peopleID) => {
  // check if the user is admin
  try {
    // delete item and get all it's informations
    let people = await peoplesModel.findOneAndDelete({ _id: peopleID });
    people = JSON.stringify(people);


    // return the result
    return result(false, "people deleted successfully !", JSON.parse(people));
  } catch (error) {
    return result(
      true,
      `${__dirname} deletepeople function => ${error.message}`,
      null
    );
  }
};

module.exports.editpeople = async (peopleID, data) => {
  try {
    // check if there is any true changes before
    let peopleToEdit = JSON.stringify(await peoplesModel.findById(peopleID));
    peopleToEdit = JSON.parse(peopleToEdit);
    if (
      peopleToEdit.fname === data.fname &&
      peopleToEdit.lname === data.lname &&
      peopleToEdit.phone === data.phone &&
      peopleToEdit.email === data.email &&
      peopleToEdit.club === data.club &&
      peopleToEdit.Identificators.firearmLicence=== data.Identificators.firearmLicence &&
      peopleToEdit.Identificators.refreeLincense === data.Identificators.refreeLincense &&
      peopleToEdit.Identificators.trainerLicense === data.Identificators.trainerLicense
    )
      return result(
        true,
        `please make some changes before to confirme !`,
        null
      );

    // edit the selected item
    const people = await peoplesModel.findOneAndUpdate(
      { _id: peopleID },
      {
        $set: data,
      }
    );

    return result(false, "people edited", people);
  } catch (error) {
    return result(true, `inventory line 120 => ${error.message}`, null);
  }
};

module.exports.getInformation = async () => {
  const totalpeoples = await peoplesModel.aggregate([
    {
      $group: {
        _id: null,
        total_peoples: { $sum: 1 },
      },
    },
  ]);

  return result(false, "get info", {
    totalpeoples,
  });
}
