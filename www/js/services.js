angular.module('sociogram.services', [])
.factory('PetService', function() {
  var watchList = [];
  var feed = 'Trending';
  var addCollWatch = {};
  var single = {};
   var single2 = {};
  var singleShop = {};
    var singleShop2 = {};
  var singleProfile = {};
   var singleProfile2 = {};
   var profileCollection = [];
       var shopCollection = [];
       var loginCollection = [];
    var singlePerson = {};
  var singleShopPerson = {};
  var singleProfilePerson = {};
  var shopCatList = [];
  var userItem = false;
 var profileView = true;
 var profileView2 = true;
 var profileView3 = true;
 var profileView4 = true;
 var catHead = '';
 var catTag = '';
 var profilePic = "";

  var foll9 = function(watchList,event){
      for(i=0;i<watchList.length;i++){
         if(watchList[i].name==event.name&&watchList[i].watched){
           return true;
          }
        }
      };

  return {
             getCatList: function () {
                return shopCatList;
            },
             setCatList: function (value) {
                shopCatList = value;
            },
            getWatchList: function () {
                return watchList;
            },
            setWatchList: function(value) {
                watchList = value;
            },
            getSingle: function () {
                return single;
            },
            setSingle: function(event) {
                single = event;
            },
             getSingle2: function () {
                return single2;
            },
            setSingle2: function(event) {
                single2 = event;
            },
             getSingleShop: function () {
                return singleShop;
            },
            setSingleShop: function(event) {
                singleShop = event;
            },
             getSingleShop2: function () {
                return singleShop2;
            },
            setSingleShop2: function(event) {
                singleShop2 = event;
            },
             getSingleProfile: function () {
                return singleProfile;
            },
            setSingleProfile: function(event) {
                singleProfile = event;
            },
             getSingleProfile2: function () {
                return singleProfile2;
            },
            setSingleProfile2: function(event) {
                singleProfile2 = event;
            },
               getSinglePerson: function () {
                return singlePerson;
            },
            setSinglePerson: function(event) {
                singlePerson = event;
            },
             getSingleShopPerson: function () {
                return singleShopPerson;
            },
            setSingleShopPerson: function(event) {
                singleShopPerson = event;
            },
             getSingleProfilePerson: function () {
                return singleProfilePerson;
            },
            setSingleProfilePerson: function(event) {
                singleProfilePerson = event;
            },
            setProfileCollection: function(value) {
                profileCollection = value;
            },
            getProfileCollection: function(){
              return profileCollection;
            },
             setShopCollection: function(value) {
                shopCollection = value;
            },
            getShopCollection: function(){
              return shopCollection;
            },
              setLoginCollection: function(value) {
                loginCollection = value;
            },
            getLoginCollection: function(){
              return loginCollection;
            },
            setProfPic: function(value) {
                profilePic = value;
            },
            getProfPic: function(){
              return profilePic;
            },
            setFeed: function(value) {
                feed = value;
            },
            getFeed: function(){
              return feed;
            },
                getAddColl: function () {
                return addCollWatch;
            },
            setAddColl: function(watch) {
                addCollWatch = watch;
            },
              setCatHead: function(value) {
                catHead = value;
            },
            getCatHead: function(){
              return catHead;
            },
                setCatTag: function(value) {
                catTag = value;
            },
            getCatTag: function(){
              return catTag;
            },
            setProfileView: function(value) {
                profileView = value;
            },
            getProfileView: function () {
                return profileView;
            },
             setProfileView2: function(value) {
                profileView2 = value;
            },
            getProfileView2: function () {
                return profileView2;
            },
             setProfileView3: function(value) {
                profileView3 = value;
            },
            getProfileView3: function () {
                return profileView3;
            },
             setProfileView4: function(value) {
                profileView4 = value;
            },
            getProfileView4: function () {
                return profileView4;
            },
             setUser: function(uI) {
                userItem = uI;
            },
            getUser: function () {
                return userItem;
            },
             logOut: function () {
                userItem = false;
                profileView = true;
                profilePic = '';
            },
             refreshWatches: function(value) {
                var newWatchList = [];
                  for(a=0;a<value.length;a++){
                      if(newWatchList.indexOf(value[a])==-1){
                        newWatchList.push(value[a]);
                      }
                    }
                watchList = newWatchList;
          }
        }
});
