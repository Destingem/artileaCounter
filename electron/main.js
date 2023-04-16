const documents = require('./index.js');
// setup the electron app variable

const { BrowserWindow, app, dialog } = require("electron");

// the path is used to get the path of the prealod file
const path = require("path");
const { channel } = require("./constants");
const { default: mongoose } = require("mongoose");
// isDev is used to check the app is on production or on dev
const isDev = require("electron-is-dev");
const userDB = require("../DataBase/Functions/usersFun");
const { ipcMain } = require("electron/main");
const peopleDB = require("../DataBase/Functions/peopleFun");
const clubDB = require("../DataBase/Functions/clubsFun");
const disciplineDB = require("../DataBase/Functions/disciplinesFun");
const competitionDB = require("../DataBase/Functions/competitionFun");
const shootingrangeDB = require("../DataBase/Functions/shootingRangeFun");

const FlexSearch = require('flexsearch');



async function search(query) {
  const searchIndex = new FlexSearch.Document({
    document: {
      id: 'id',
      field: ['title', 'content'],
    },
    tokenize: 'strict',
    async: true,
    depth: 3,
    threshold: -1,
  });
  
  
  documents.forEach((doc) => {
 
    searchIndex.add(doc);
  });
  console.log(query);
  const results = await searchIndex.searchAsync(query);
  console.log("Documents:", documents);
  console.log('Raw search results:', results);

  const resultSet = new Set();
  results.forEach(result => {
    result.result.forEach(id => {
      resultSet.add(id);
    });
  });

  const foundDocuments = Array.from(resultSet).map(id => {
    return documents.find(doc => doc.id === id);
  });

  return foundDocuments;
}

// Call the search function with a query


// set win variable iterable to use it anywhere
let win = null;

// create the function create window
function createWindow() {
  win = new BrowserWindow({
    height: 800,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
      worldSafeExecuteJavaScript: true,
    
    },
  });

  // loadURL will be localhos:3000 on dev mode and main.html on production
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // add mongo db connection
  mongoose.set("strictQuery", true);
  mongoose.connect(
    isDev
      ? "mongodb://localhost:27017/Scoutshooter-test"
      : "mongodb://localhost:27017/Scoutshooter",
    async (err) => {
      if (err)
        return dialog.showErrorBox(
          `DB connexion probleme occured !`,
          err.message
        );

      // console log that the connexion to the DB is established
      console.log("mongoDB connected...");

      // Open the DevTools.
      if (isDev) {
        win.webContents.openDevTools({ mode: "detach" });
      }

      // set visible when it's finish loading
      win.webContents.on("did-finish-load", () => {
        win.show();
      });
    }
  );
}

// wait for the app to start then create the window
app.whenReady().then(createWindow);

// this code is for darwin system
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle(channel.LOGIN, async (e, args) => {
  return await userDB.verifyUser(args);
});

//? sign up function
ipcMain.handle(channel.SIGNUP, async (e, args) => {
  return await userDB.addUser(args);
});

ipcMain.handle("screen", async (e, args) => {
  if (!win.isMaximized()) win.maximize();
  else win.unmaximize();
});

ipcMain.handle(channel.ADD_PEOPLE, async (e, args) => {
  return await peopleDB.addpeople(args);
});

ipcMain.handle(channel.GET_PEOPLES, async (e, args) => {
  return await peopleDB.getpeoples();
});
ipcMain.handle(channel.DELETE_PEOPLE, async (e, args) => {
  return await peopleDB.deletepeople(args._id);
});
ipcMain.handle(channel.INFO_PEOPLE, async (e, args) => {
  return await peopleDB.getInformation();
});
ipcMain.handle(channel.INFO_CLUBS, async (e, args) => {
  return await clubDB.getInformation();
});
ipcMain.handle(channel.INFO_COMP, async (e, args) => {
  return await competitionDB.getInformation();
});
ipcMain.handle(channel.EDIT_RESULT, async (e, args) => {
console.log(args)
  return await competitionDB.editResult(args.competitionID, args.shootingSessionID, args.data);
});

ipcMain.handle(channel.EDIT_PEOPLE, async (e, args) => {

  return await peopleDB.editpeople(args._id, args.datas);
});

ipcMain.handle(channel.ADD_CLUB, async (e, args) => {
  return await clubDB.addClub(args);
});

ipcMain.handle(channel.GET_CLUBS, async (e, args) => {
  return await clubDB.getClubs();
});

ipcMain.handle(channel.DELETE_CLUB, async (e, args) => {
  return await clubDB.deleteClub(args._id);
});

ipcMain.handle(channel.EDIT_CLUB, async (e, args) => {
  return await clubDB.editClub(args._id, args.data);
});

ipcMain.handle(channel.ADD_ClUBMEMBER, async (e, args) => {
  return await clubDB.addClubMember(args.id, args.team);
});
ipcMain.handle(channel.DELETE_ClUBMEMBER, async (e, args) => {
  return await clubDB.deleteClubMember(args.id, args.data);
});
ipcMain.handle(channel.ADD_DISCIPLINE, async (e, args) => {
  return await disciplineDB.adddisciplines(args);
});

ipcMain.handle(channel.GET_DISCIPLINES, async () => {
  return await disciplineDB.getdisciplines();
});

ipcMain.handle(channel.DELETE_DISCIPLINE, async (e, args) => {
  return await disciplineDB.deletedisciplines(args._id);
});

ipcMain.handle(channel.EDIT_DISCIPLINE, async (e, args) => {
  return await disciplineDB.editdisciplines(args._id, args.dataz);
});

ipcMain.handle(channel.ADD_FINAL, async (e, args) => {
  return await disciplineDB.addfinal(args.id, args.team);
});

ipcMain.handle(channel.ADD_onRegular, async (e, args) => {
  return await disciplineDB.addonregular(args.id, args.team);
});
ipcMain.handle(channel.ADD_onElectronic, async (e, args) => {
  return await disciplineDB.addonElectronic(args.id, args.team);
});

ipcMain.handle(channel.ADD_onMigratory, async (e, args) => {
  return await disciplineDB.addonMigratory(args.id, args.team);
});
ipcMain.handle(channel.ADD_other, async (e, args) => {
  return await disciplineDB.addonother(args.id, args.team);
});

ipcMain.handle(channel.DELETE_other, async (e, args) => {
  return await disciplineDB.deleteOther(args._id, args.team);
});

ipcMain.handle(channel.SEARCH, async (e, args)=> {
  console.log(args)
  let result = await search(args)
  return JSON.stringify(result)
})




ipcMain.handle(channel.ADD_SHOOTINGRANGE, async (e, args) => {
  return await shootingrangeDB.addshootingRange(args);
});

ipcMain.handle(channel.GET_SHOOTINGRANGES, async () => {
  return await shootingrangeDB.getshootingRanges();
});

ipcMain.handle(channel.DELETE_SHOOTINGRANGE, async (e, args) => {
  return await shootingrangeDB.deleteshootingRange(args._id);
});

ipcMain.handle(channel.EDIT_SHOOTINGRANGE, async (e, args) => {
  console.log(args);
  return await shootingrangeDB.editshootingRange(args._id, args.data);
});

ipcMain.handle(channel.ADD_PLACESHOOTINGRANGE, async (e, args) => {
  return await shootingrangeDB.addShootingRangePlace(args.id, args.team);
});
ipcMain.handle(channel.DELETE_PLACESHOOTINGRANGES, async (e, args) => {
  return await shootingrangeDB.deleteShootingRangePlace(args.id, args.data);
});

ipcMain.handle(channel.ADD_MANAGERSHOOTINGRANGE, async (e, args) => {
  return await shootingrangeDB.addShootingRangeManagers(args.id, args.team);
});
ipcMain.handle(channel.DELETE_MANAGERSHOOTINGRANGE, async (e, args) => {
  return await shootingrangeDB.deleteShootingRangeManagers(args.id, args.data);
});

ipcMain.handle(channel.ADD_OTHERSHOOTINGRANGE, async (e, args) => {
  return await shootingrangeDB.addShootingRangeOther(args.id, args.team);
});
ipcMain.handle(channel.DELETE_OTHERSHOOTINGRANGE, async (e, args) => {
  return await shootingrangeDB.deleteShootingRangeOther(args.id, args.data);
});


ipcMain.handle(channel.ADD_COMPETITION, async (e, args) => {
  return await competitionDB.addcompetition(args);
});

ipcMain.handle(channel.GET_COMPETITIONS, async () => {
  return await competitionDB.getcompetitions();
});

ipcMain.handle(channel.DELETE_COMPETITION, async (e, args) => {
  return await competitionDB.deletecompetition(args._id);
});

ipcMain.handle(channel.EDIT_COMPETITION, async (e, args) => {
  return await competitionDB.editcompetition(args._id, args.data);
});


ipcMain.handle(channel.ADD_COMPETITIONshootingRanges, async (e, args) => {
  return await competitionDB.addshootingRanges(args._id, args.data);
});
ipcMain.handle(channel.DELETE_COMPETITIONshootingRanges, async (e, args) => {
  return await competitionDB.deleteshootingRanges(args._id, args.data);
});

ipcMain.handle(channel.ADD_COMPETITIONdiscipliness, async (e, args) => {
  return await competitionDB.adddisciplines(args._id, args.data);
});
ipcMain.handle(channel.DELETE_COMPETITIONdisciplines, async (e, args) => {
  return await competitionDB.deletedisciplines(args._id, args.data);
});

ipcMain.handle(channel.ADD_COMPETITIONshooters, async (e, args) => {
  return await competitionDB.addshooters(args._id, args.data);
});
ipcMain.handle(channel.DELETE_COMPETITIONshooters, async (e, args) => {
  return await competitionDB.deleteshooters(args._id, args.data);
});

ipcMain.handle(channel.ADD_COMPETITIONstaff, async (e, args) => {
  return await competitionDB.adddstaff(args._id, args.data);
});
ipcMain.handle(channel.DELETE_COMPETITIONstaff, async (e, args) => {
  return await competitionDB.deletestaff(args._id, args.data);
});

ipcMain.handle(channel.ADD_COMPETITIONstaffrefrees, async (e, args) => {
  return await competitionDB.adddstaffREF(args._id, args.data);
});
ipcMain.handle(channel.DELETE_COMPETITIONstaffrefrees, async (e, args) => {
  return await competitionDB.deletestaffREF(args._id, args.data);
});

ipcMain.handle(channel.ADD_COMPETITIONstaffotherStaff, async (e, args) => {
  return await competitionDB.adddstaffOther(args._id, args.data);
});
ipcMain.handle(channel.DELETE_COMPETITIONstaffotherStaff, async (e, args) => {
  return await competitionDB.deletestaffOther(args._id, args.data);
});

ipcMain.handle(channel.ADD_COMPETITIONshiftRefrees, async (e, args) => {
  return await competitionDB.adddshiftsshiftRefrees(args._id, args.data);
});
ipcMain.handle(channel.DELETE_COMPETITIONshiftRefrees, async (e, args) => {
  return await competitionDB.deleteshiftsshiftRefrees(args._id, args.data);
});


ipcMain.handle(channel.ADD_shiftsdisciplines, async (e, args) => {
  return await competitionDB.adddshiftsdisciplines(args._id, args.data);
});
ipcMain.handle(channel.DELETE_shiftsdisciplines, async (e, args) => {
  return await competitionDB.deleteshiftdisciplines(args._id, args.data);
});

ipcMain.handle(channel.ADD_COMPETITIONshifts, async (e, args) => {
  return await competitionDB.adddshifts(args._id, args.data);
});
ipcMain.handle(channel.DELETE_COMPETITIONshifts, async (e, args) => {
  return await competitionDB.deleteshifts(args._id, args.data);
});


ipcMain.handle(channel.ADD_COMPETITIONshootingSessions, async (e, args) => {
  return await competitionDB.adddshiftsshootingSessions(args._id, args.data);
});
ipcMain.handle(channel.DELETE_COMPETITIONshootingSessions, async (e, args) => {
  return await competitionDB.deleteshiftsshootingSessions(args._id, args.data);
});



