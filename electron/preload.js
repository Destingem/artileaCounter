const { contextBridge, ipcRenderer } = require("electron");
const channel = {
  LOGIN: "login",
  SIGNUP: "signup",

  ADD_PEOPLE: "add:people",
  GET_PEOPLES: "get:peoples",
  DELETE_PEOPLE: "DELETE:people",
  EDIT_PEOPLE: "Edit:people",
  INFO_PEOPLE: "INFO:people",


  ADD_CLUB: "add:club",
  GET_CLUBS: "get:clubs",
  INFO_CLUBS: "INFO:clubs",
  DELETE_CLUB: "DELETE:club",
  EDIT_CLUB: "Edit:clubs",
  ADD_ClUBMEMBER: "add:clubMember",
  DELETE_ClUBMEMBER: "DELETE:clubMember",

  ADD_DISCIPLINE: 'add:disciplineDB',
  GET_DISCIPLINES: 'get:disciplineDBs',
  DELETE_DISCIPLINE: "DELETE:disciplineDB",
  EDIT_DISCIPLINE: "Edit:disciplineDB",
  ADD_FINAL: 'add:final',
  ADD_onRegular: 'add:onRegular',
  ADD_onElectronic: 'add:onElectronic',
  ADD_onMigratory: 'add:onMigratory',
  ADD_other: 'add:other',
  DELETE_other: 'delete:other',

  ADD_SHOOTINGRANGE: 'add:shootingrange',
  GET_SHOOTINGRANGES: 'get:shootingranges',
  DELETE_SHOOTINGRANGE: "DELETE:shootingrange",
  EDIT_SHOOTINGRANGE: "Edit:shootingrange",

  ADD_PLACESHOOTINGRANGE: 'add:placeshootingrange',
  DELETE_PLACESHOOTINGRANGES: 'DELETE:placeshootingranges',
  ADD_MANAGERSHOOTINGRANGE: "add:managershootingrange",
  DELETE_MANAGERSHOOTINGRANGE: "DELETE:managershootingrange",
  ADD_OTHERSHOOTINGRANGE: "add:othershootingrange",
  DELETE_OTHERSHOOTINGRANGE: "DELETE:othershootingrange",

  ADD_COMPETITION: 'add:compitition',
  GET_COMPETITIONS: 'get:compititions',
  DELETE_COMPETITION: "DELETE:compitition",
  EDIT_COMPETITION: "Edit:compitition",

  ADD_COMPETITIONshootingRanges: 'add:compititionshootingRanges',
  DELETE_COMPETITIONshootingRanges: "DELETE:compititionshootingRanges",
  ADD_COMPETITIONdiscipliness: 'add:compititiondisciplines',
  DELETE_COMPETITIONdisciplines: "DELETE:compititiondisciplines",
  ADD_COMPETITIONshooters: 'add:compititionshooters',
  DELETE_COMPETITIONshooters: "DELETE:compititionshooters",
  ADD_COMPETITIONstaff: 'add:compititionstaff',
  DELETE_COMPETITIONstaff: "DELETE:compititionstaff",
  ADD_COMPETITIONstaffrefrees: 'add:compititionstaffrefrees',
  DELETE_COMPETITIONstaffrefrees: "DELETE:compititionstaffrefrees",
  ADD_COMPETITIONstaffotherStaff: 'add:compititionstaffotherStaff',
  DELETE_COMPETITIONstaffotherStaff: "DELETE:compititionstaffotherStaff",
  ADD_COMPETITIONshiftRefrees: 'add:compititionshiftRefreess',
  DELETE_COMPETITIONshiftRefrees: "DELETE:compititionshiftRefrees",
  ADD_shiftsdisciplines: 'add:shiftisciplines',
  DELETE_shiftsdisciplines: "DELETE:shiftsdisciplines",
  ADD_COMPETITIONshifts: 'add:compititionshifts',
  DELETE_COMPETITIONshifts: "DELETE:compititionshifts",
  ADD_COMPETITIONshootingSessions: 'add:compititionshootingSessions',
  DELETE_COMPETITIONshootingSessions: "DELETE:compititionshootingSessions",
  INFO_COMP: "INFO:COMP",












};
contextBridge.exposeInMainWorld("api", {
  screen: {
    size: function () {
      return ipcRenderer.invoke("screen");
    },
  },
  auth: {
    login: function (data) {
      return ipcRenderer.invoke(channel.LOGIN, data);
    },
    signup: function (data) {
      return ipcRenderer.invoke(channel.SIGNUP, data);
    },
  },
  people: {
    add: function (data) {
      return ipcRenderer.invoke(channel.ADD_PEOPLE, data);
    },
    get: function (data) {
      return ipcRenderer.invoke(channel.GET_PEOPLES, data);
    },

    delete: function (data){
      return ipcRenderer.invoke(channel.DELETE_PEOPLE, data);
    },
    edit: function (data){
      return ipcRenderer.invoke(channel.EDIT_PEOPLE, data);
    },
    info: function (data){
      return ipcRenderer.invoke(channel.INFO_PEOPLE, data);
    }
  },
  club: {

    info: function (data) {
      return ipcRenderer.invoke(channel.INFO_CLUBS, data);
    },
    add: function (data) {
      return ipcRenderer.invoke(channel.ADD_CLUB, data);
    },
    get: function (data) {
      return ipcRenderer.invoke(channel.GET_CLUBS, data);
    },
    delete: function (data){
      return ipcRenderer.invoke(channel.DELETE_CLUB, data);
    },
    edit: function (data){
      return ipcRenderer.invoke(channel.EDIT_CLUB, data);
    },
    addmember: function(data){
      return ipcRenderer.invoke(channel.ADD_ClUBMEMBER, data);
    },
    deletemember: function(data){
      return ipcRenderer.invoke(channel.DELETE_ClUBMEMBER, data);
    }
  },
  discipline: {
    add: function (data) {
      return ipcRenderer.invoke(channel.ADD_DISCIPLINE, data)
    },
    get: function () {
      return ipcRenderer.invoke(channel.GET_DISCIPLINES)
    },
    delete: function (data){
      return ipcRenderer.invoke(channel.DELETE_DISCIPLINE, data);
    },
    edit: function (data){
      return ipcRenderer.invoke(channel.EDIT_DISCIPLINE, data);
    },

    final:function (data){
      return ipcRenderer.invoke(channel.ADD_FINAL, data);
    },
    onRegular:function (data){
      return ipcRenderer.invoke(channel.ADD_onRegular, data);
    },
    onElectronic:function (data){
      return ipcRenderer.invoke(channel.ADD_onElectronic, data);
    },
    onMigratory:function (data){
      return ipcRenderer.invoke(channel.ADD_onMigratory, data);
    },
    other:function (data){
      return ipcRenderer.invoke(channel.ADD_other, data);
    },
    deleteother:function (data){
      return ipcRenderer.invoke(channel.DELETE_other, data);
    },
  },
  shootingrange: {
    add: function (data) {
      return ipcRenderer.invoke(channel.ADD_SHOOTINGRANGE, data)
    },
    get: function () {
      return ipcRenderer.invoke(channel.GET_SHOOTINGRANGES)
    },
    delete: function (data){
      return ipcRenderer.invoke(channel.DELETE_SHOOTINGRANGE, data);
    },
    edit: function (data){
      return ipcRenderer.invoke(channel.EDIT_SHOOTINGRANGE, data);
    },

    addplace: function (data) {
      return ipcRenderer.invoke(channel.ADD_PLACESHOOTINGRANGE, data)
    },
    deleteplace: function (data) {
      return ipcRenderer.invoke(channel.DELETE_PLACESHOOTINGRANGES, data)
    },
    addmanager: function (data){
      return ipcRenderer.invoke(channel.ADD_MANAGERSHOOTINGRANGE, data);
    },
    deletemanager: function (data){
      return ipcRenderer.invoke(channel.DELETE_MANAGERSHOOTINGRANGE, data);
    },
    addother: function (data){
      return ipcRenderer.invoke(channel.ADD_OTHERSHOOTINGRANGE, data);
    },
    deleteother: function (data){
      return ipcRenderer.invoke(channel.DELETE_OTHERSHOOTINGRANGE, data);
    }
  },
  compitition:{
    add: function (data) {
      return ipcRenderer.invoke(channel.ADD_COMPETITION, data)
    },
    get: function () {
      return ipcRenderer.invoke(channel.GET_COMPETITIONS)
    },
    delete: function (data){
      return ipcRenderer.invoke(channel.DELETE_COMPETITION, data);
    },
    edit: function (data){
      return ipcRenderer.invoke(channel.EDIT_COMPETITION, data);
    },

    addshootingRanges: function (data) {
      return ipcRenderer.invoke(channel.ADD_COMPETITIONshootingRanges, data)
    },
    deleteshootingRanges: function (data){
      return ipcRenderer.invoke(channel.DELETE_COMPETITIONshootingRanges, data);
    },
    adddisciplines: function (data) {
      return ipcRenderer.invoke(channel.ADD_COMPETITIONdiscipliness, data)
    },
    deletedisciplines: function (data){
      return ipcRenderer.invoke(channel.DELETE_COMPETITIONdisciplines, data);
    },
    addshooters: function (data) {
      return ipcRenderer.invoke(channel.ADD_COMPETITIONshooters, data)
    },
    deleteshooters: function (data){
      return ipcRenderer.invoke(channel.DELETE_COMPETITIONshooters, data);
    },
    addstaff: function (data) {
      return ipcRenderer.invoke(channel.ADD_COMPETITIONstaff, data)
    },
    deletestaff: function (data){
      return ipcRenderer.invoke(channel.DELETE_COMPETITIONstaff, data);
    },
    addstaffrefrees: function (data) {
      return ipcRenderer.invoke(channel.ADD_COMPETITIONstaffrefrees, data)
    },
    deletestaffrefrees: function (data){
      return ipcRenderer.invoke(channel.DELETE_COMPETITIONstaffrefrees, data);
    },
    addstaffotherStaff: function (data) {
      return ipcRenderer.invoke(channel.ADD_COMPETITIONstaffotherStaff, data)
    },
    deletestaffotherStaff: function (data){
      return ipcRenderer.invoke(channel.DELETE_COMPETITIONstaffotherStaff, data);
    },
    addshifts: function (data) {
      return ipcRenderer.invoke(channel.ADD_COMPETITIONshifts, data)
    },
    deleteshifts: function (data){
      return ipcRenderer.invoke(channel.DELETE_COMPETITIONshifts, data);
    },
    info: function (data){
      return ipcRenderer.invoke(channel.INFO_COMP, data);
    },
    // addshiftsshootingSessions: function (data) {
    //   return ipcRenderer.invoke(channel.ADD_COMPETITIONshootingSessions, data)
    // },
    // deleteshiftsshootingSessions: function (data){
    //   return ipcRenderer.invoke(channel.DELETE_COMPETITIONshootingSessions, data);
    // },
    // addshiftsshiftRefrees: function (data) {
    //   return ipcRenderer.invoke(channel.ADD_COMPETITIONshiftRefrees, data)
    // },
    // deleteshiftsshiftRefrees: function (data){
    //   return ipcRenderer.invoke(channel.DELETE_COMPETITIONshiftRefrees, data);
    // },
    // addshiftsdisciplines: function (data) {
    //   return ipcRenderer.invoke(channel.ADD_COMPETITIONdisciplinessTION, data)
    // },
    // deleteshiftsdisciplines: function (data){
    //   return ipcRenderer.invoke(channel.DELETE_COMPETITIONdisciplinesITION, data);
    // },




  }
});
