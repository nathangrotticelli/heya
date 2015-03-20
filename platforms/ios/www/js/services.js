angular.module('sociogram.services', [])
.factory('PetService', function() {
  var events = {};
  var watchList = [];
  var feed = 'Trending';
        // {
        //     "watchName": "Amazon Product Number 42222",
        //     "watchPhoto": "http://i01.i.aliimg.com/wsphoto/v0/2044502801_1/2014-font-b-Bewell-b-font-Women-Dress-font-b-Watch-b-font-Super-Hot-font.jpg",
        //     "watchPrice": "$10",
        //     "watchLink": "http://www.google.com",
        //     "watchLikes": []
        // },
        // {
        //     "watchName": "Amazon Product Number 52222",
        //     "watchPhoto": "http://i.ebayimg.com/00/s/MTYwMFgxNDY2/z/-NsAAOxygPtSp-vc/$_35.JPG",
        //     "watchPrice": "$11",
        //     "watchLink": "http://www.google.com",
        //     "watchLikes": []
        // }
    // ];

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

  var shopCatList = [
        {
            "catName": "Techie",
            "catTag":"TCH",
            "catPhoto": "http://i62.tinypic.com/2lnd7q1.jpg"
        },
        {
            "catName": "Minimalist",
            "catTag":"MIN",
            "catPhoto": "http://i62.tinypic.com/5ys3nk.jpg"
        },
        {
            "catName": "Adventurous",
            "catTag":"ADV",
            "catPhoto": "http://i58.tinypic.com/mw6zhw.jpg"
        },
        {
            "catName": "Stylish",
            "catTag":"STY",
            "catPhoto": "http://i61.tinypic.com/2rcy24z.jpg"
        },
        {
            "catName": "Modern",
            "catTag":"MDR",
            "catPhoto": "http://i62.tinypic.com/2821ism.jpg"
        },
        {
            "catName": "Under $20",
            "catTag":"U20",
            "catPhoto": "http://i59.tinypic.com/1zzt5i0.jpg"
        },
        {
            "catName": "Boyfriendy",
            "catTag":"BG",
            "catPhoto": "http://i62.tinypic.com/2821ism.jpg"
        },
        {
            "catName": "Outdoorsy",
            "catTag":"OUT",
            "catPhoto": "http://i59.tinypic.com/1zzt5i0.jpg"
        }
      ];
  var privateList = {};
  var userItem = false;
  // var userItem =      {
  //            "username": "ng225",
  //           "userFullName": "Nathan Grotticelli",
  //           "userEmail": "anak@apl.co",
  //           "userPass": "ikh",
  //           "userPic": "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",
  //           "likes": [
  //         {
  //           "watchName": "Black Waterproof LED Wrist Watch",
  //           "watchPhoto": "http://i59.tinypic.com/1zzt5i0.jpg",
  //           "watchPrice": "$9",
  //           "watchLink": "http://www.amazon.com/SKMEI-Fashion-Function-Waterproof-Military/dp/B00HJFMRFA/ref=sr_1_5?ie=UTF8&qid=1421219748&sr=8-5&keywords=watches&pebp=1421220224474&peasin=B00HJFMRFA",
  //           "watchLikes": [
  //               {
  //                   "username": "ng225",
  //                   "userPic": "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"
  //               }
  //           ],
  //           "tags": [
  //               "TCH",
  //               "OUT",
  //               "U20"
  //           ]
  //       }
  //           ],
  //           "collections": []
  //       };
  var school = "";
  var unFriends = [];
  // var userProfId = "";
  var newUser = "no";
  var newNot = false;
 var profileView = true;
 var profileView2 = true;
 var profileView3 = true;
 var profileView4 = true;
  var singleView = false;
 var startCard = true;
 var userPic = "";
 var catHead = '';
 var catTag = '';
 var tabs = true;
  var backBtn = false;
 var cards = ["start"];
 var followCount = 0;
 var profilePic = "";


  var foll9 = function(watchList,event){

      // alert(watchedIndex);&&watchList[i].start_time==event.start_time
      for(i=0;i<watchList.length;i++){
        // alert(JSON.stringify(watchList));
      // alert(watchList[i].watched);
         if(watchList[i].name==event.name&&watchList[i].watched){
          // alert('yes');
           return true;
          }
        }
        // return false;
      };
 // var cardIndex = undefined;



  // var unFriends = [];
  // var notifications = {};

  return {
    getCache: function () {
                return profileCache;
            },
             getCatList: function () {
                return shopCatList;
            },
            getWatchList: function () {
                return watchList;
            },
            setWatchList: function(value) {
                watchList = value;
            },
          getEvents: function () {
                return events;
            },
             setEvents: function(value) {
                events = value;
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
            setFollowCount: function(value) {
                followCount = value;
            },
            getFollowCount: function(){
              return followCount;
            },
            setTabs: function(value) {
                tabs = value;
            },
            getTabs: function(){
              return tabs;
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
            setBack: function(value) {
                backBtn = value;
            },
            getBack: function(){
              return backBtn;
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
            setSchool: function(schoolName) {
                school = schoolName;
            },
            getSchool: function () {
                return school;
            },
              setPrivateList: function(list) {
                privateList = list;
            },
            getPrivateList: function () {
                return privateList;
            },
             setNewNot: function(value) {
                newNot = value;
            },
            getNewNot: function () {
                return newNot;
            },
             setStart: function(value) {
                startCard = value;
            },
            getStart: function () {
                return startCard;
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
             setSingleView: function(value) {
                singleView = value;
            },
            getSingleView: function () {
                return singleView;
            },
            setCards: function(value) {
                cards = value;
            },
            getCards: function () {
              // event.watched=foll9(userItem.watchList,event);
              // if(cards[0]=="empty" && cards.length>1){
              //   cards.splice(0, 1);
              // }
              // || cards[0]=="empty"
              // if(cards[0] == "empty" && cards.length >1 ){

              // }
            if( cards[0]=="start"){
                // var answerArray = [];||cards[0] == "empty"
                // alert('here');
                // var a3 = events;
                cards = [];

                for(var key in events){
                  // events[key].watched3 = foll9(userItem.watchList, events[key]);

                   if(foll9(userItem.watchList, events[key])!= true){
                      // alert(cards[0]);
                      cards.push(events[key]);
                    }

                  }

                }
                else if(cards[0] == "empty"&&cards.length>1){
                  cards.splice(0, 1);
                }

                if(cards.length==0){
                 cards = ["empty"];
                }
               return cards;

            },
            flipWatched: function(event){
              events[event.name].watched=!events[event.name].watched;
            },
             getWatched: function(event){
              return events[event.name].watched;
            },
             setUNFriends: function(friends) {
                // alert('setting id');
                // alert(userProfId);
                unFriends = friends;

            },
            getUNFriends: function () {
                return unFriends;
            },
             setUser: function(uI) {
                // alert('setting id');
                // alert(userProfId);
                userItem = uI;

            },
            getUser: function () {
                return userItem;
            },
            setNewUser: function(userIs){
              newUser = userIs;

            },
            getUserPic: function () {
                return userPic;
            },
            setUserPic: function(value){
              userPic = value;
            },
            getNew: function () {
                return newUser;
            },
             logOut: function () {
                // events = {};
                single = {};
                singleShop = {};
                singleProfile = {};
                userItem = false;
                profileView = true;
                userPic = '';
                catHead = '';
                catTag = '';
                profilePic = '';
                // singleView = false;
                // privateList = {};
                // userItem = {};
                // school = "";
                // unFriends = [];
                // var userProfId = "";
                // newUser = "no";
                // newNot = false;
                // tinderView = false;
                // singleView = false;
                // startCard = true;
                // cards = ["start"];
                // followCount = 0;
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
        //       refreshWatches: function(value) {
        //         var newWatchList = [];
        //           for(a=0;a<value.length;a++){
        //               if(newWatchList.indexOf(value[a])<0){
        //                 // alert(watchList.indexOf(value[a]));
        //               alert('new event');
        //                 newWatchList.push(value[a]);
        //               }
        //             }
        //         watchList = newWatchList;
        //   }
        // }
        }
});
