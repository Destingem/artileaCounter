const { default: mongoose } = require("mongoose");
const { result } = require("./ResultObj");
const { clubsModel }= require("../Models/club");

module.exports.addClub = async (data) => {
  try {
    // create new item and save it in the data base
    const Club = new clubsModel({
      ...data,
    });
    const newClub = await Club.save();

    return result(
      false,
      `the Club ${data.name} was added successfuly !`,
      newClub
    );
  } catch (error) {
    // return error if server DB crashed
    return result(
      true,
      `${__dirname} addClub function => ${error.message}`,
      null
    );
  }
};
module.exports.addClubMember = async (club_id,data) => {
  try {
    const Clubs = await clubsModel.findOneAndUpdate(
      { _id: club_id },
      { $push: { members: data } }
    )

    return result(false, "Member Added", Clubs);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};
module.exports.deleteClubMember = async (club_id,data) => {
  try {
    const Clubs = await clubsModel.findOneAndUpdate(
      { _id: club_id },
      { $pull: { members: data } }
    )

    return result(false, "Member Removed", Clubs);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};


module.exports.getClubs = async () => {
  try {
    const Clubs = await clubsModel.aggregate([
  {
    $lookup:{
      from: "peoples",
      localField: "members",
      foreignField: "_id",
      as: "members",
    },
  },
])

    return result(false, "all Clubs", Clubs);
  } catch (error) {
    console.log(error.message);
    return result(
      true,
      `${__dirname} getClubs function => ${error.message}`,
      null
    );
  }
};

module.exports.getClub = async (ClubID) => {
  try {
    const Club =  await clubsModel.findById(ClubID)
    return result(false, "get Club", Club);
  } catch (error) {
    return result(
      true,
      `${__dirname} getClub function => ${error.message}`,
      null
    );
  }
};

module.exports.deleteClub = async (ClubID) => {
  // check if the user is admin
  try {
    // delete item and get all it's informations
    let Club = await clubsModel.findOneAndDelete({ _id: ClubID });
    Club = JSON.stringify(Club);


    // return the result
    return result(false, "Club deleted successfully !", JSON.parse(Club));
  } catch (error) {
    return result(
      true,
      `${__dirname} deleteClub function => ${error.message}`,
      null
    );
  }
};

module.exports.editClub = async (ClubID, data) => {
  try {
    // check if there is any true changes before
    let ClubToEdit = JSON.stringify(await clubsModel.findById(ClubID));
    ClubToEdit = JSON.parse(ClubToEdit);
    if (
      ClubToEdit.name === data.name &&
      ClubToEdit.nationality === data.nationality &&
      ClubToEdit.organization === data.organization &&
      ClubToEdit.phone === data.phone &&
      ClubToEdit.email === data.email &&
      ClubToEdit.members === data.members
    )
      return result(
        true,
        `please make some changes before to confirme !`,
        null
      );

    // edit the selected item
    const Club = await clubsModel.findOneAndUpdate(
      { _id: ClubID },
      {
        $set:data,
      }
    );

    return result(false, "Club edited", Club);
  } catch (error) {
    return result(true, `Club line 120 => ${error.message}`, null);
  }
};


module.exports.getInformation = async () => {
  const totalClubs = await clubsModel.aggregate([
    {
      $group: {
        _id: null,
        total_Clubs: { $sum: 1 },
      },
    },
  ]);

  return result(false, "get info", {
    totalClubs,
  });
}


