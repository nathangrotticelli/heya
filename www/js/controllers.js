angular.module('sociogram.controllers', ['ionic'])

  //for side menu
  .controller('AppCtrl', function ($scope, $state,$location,PetService, OpenFB, $timeout) {

      // $scope.main={};
      // alert($state.current.name);
      // $scope.main.tabs = false;
      $scope.shouldHide = function () {
        if($state.current.name=='app.loginPrompt') {
                return true;
        }
        else{
          return false;
        }
    }
     $scope.user =function(){
      return PetService.getUser();
     };

     // var themeSelectors = ".tab-item .ion-ios7-paper-outline";
      // var declarations = {};
      // declarations["font-size"] = 99;


     // $scope.addCSS = function(selectors, declarations){
         // var themeSelectors = ".tab-item .ion-ios7-paper-outline";
         //  var declarations = {};
         //  declarations["background-color"] = "red";
       // return function(selectors, declarations) {
        // var declarationString = "";
        // angular.forEach(declarations, function(value, key) {
        //     declarationString += key + ":" + value + " !important;"
        // });

        // if (declarationString != "") {
        //     var sheet = document.createElement('style');
        //     sheet.innerHTML = selectors + " {" + declarationString + "}";
        //     document.body.appendChild(sheet);
        // }
        // return selectors
    // };
     // }
    //    $scope.addCSS = function(selectors, declarations){
    //      // var themeSelectors = ".tab-item .ion-ios7-paper-outline";
    //      //  var declarations = {};
    //      //  declarations["background-color"] = "red";
    //    // return function(selectors, declarations) {
    //     // var declarationString = "";
    //     // angular.forEach(declarations, function(value, key) {
    //     //     declarationString += key + ":" + value + " !important;"
    //     // });

    //     // if (declarationString != "") {
    //         var sheet = document.createElement('style');
    //         sheet.innerHTML = selectors + " {font-size:99!important}";
    //         document.body.appendChild(sheet);
    //     // }
    //     // return selectors
    // // };
    //  }

      // $scope.addCSS(themeSelectors, declarations);

    // addCSS = (themeSelectors, declarations);

      // $scope.main.dragContent = true;
      // $scope.main.backBtn = false;


    //logout functionality
    // $scope.logout = function () {

    //   // if(!$state.is('app.login')){
    //     OpenFB.logout();
    //     PetService.logOut();

    //   $state.go('app.login');
    //   // }

    // };

      // $scope.loginPrompt = function() {
      //        $location.path('/app/loginPrompt');
      //        PetService.setTabs(false);
      //        StatusBar.styleDefault();
      //      };

    // $scope.goEvents = function(){
    //   $timeout(function() {

    // },100);
    //   $location.path('/app/person/me/feed');
    //   //allows for scroll position on the event feed to be maintained. Think about doing this for the other menu buttons
    // };

    //   $scope.goEvents = function(){

    // if(PetService.getSingleView()==true){
    //   $location.path('/app/event-detail');
    //    $scope.main.backBtn = true;
    // }else{
    //   // PetService.setBack(false);
    //     StatusBar.styleLightContent();
    //   $location.path('/app/login');
    // }

    // };

//       $scope.goShop = function() {
// //this is lagging, why?
//     // $state.go("app.feed");
//     // $state.go("app.feed");
//     // $timeout(function() {

//     // },100);

//     // if(PetService.getShopView()==true){
//       // $location.path('/app/shop-detail');
//     // } else{
//       $location.path('/app/shop');
//     // }

//  //     // myPopup.close(); //close the popup after 3 seconds for some reason
//  //  }, 500);
//     };

    // $scope.goAdd = function(){
    //   $state.go('app.addAnEvent');
    // };

    // $scope.goHelp = function(){
    //   $state.go('app.help');
    // };

     $scope.shareBtn = function(a,b,c,d){
      analytics.trackEvent('button', 'click', 'share button', 1);
      // ga('send', 'event', 'button', 'click', 'share button', 1);
     window.plugins.socialsharing.share(a,b,c,d);
    };



  })

.controller('BackCtrl', function ($scope,$ionicActionSheet, $ionicModal,  $ionicPopover, $ionicPlatform, $ionicNavBarDelegate, $ionicScrollDelegate, $ionicPopup, $http, $location, $ionicLoading ,OpenFB, $state, $stateParams, PetService) {

$scope.getPhotos = function(){
    function onSuccess(base64string) {
       hideSheet();
        PetService.setProfPic(base64string);
        $scope.profPic = base64string;
    }
     function onFail(message) {
        hideSheet();
        // alert('Failed because: ' + message);
     }

   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: 'Use camera' },
       { text: 'Choose from photo roll' }
     ],
     titleText: null,
     cancelText: '<b>Cancel</b>',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
      if(index==0){
          navigator.camera.getPicture(onSuccess, onFail, { quality: 85,
            allowEdit : true,
           targetWidth: 125,
           targetHeight: 125,
           destinationType: Camera.DestinationType.DATA_URL,
           encodingType: Camera.EncodingType.JPEG,
           sourceType : Camera.PictureSourceType.CAMERA
          });
      }else{
        navigator.camera.getPicture(onSuccess, onFail, { quality: 85,
            allowEdit : true,
           targetWidth: 125,
           targetHeight: 125,
           destinationType: Camera.DestinationType.DATA_URL,
           encodingType: Camera.EncodingType.JPEG,
           sourceType : Camera.PictureSourceType.PHOTOLIBRARY
          });
      }
     }
   });
$scope.closeKeyboard();
}

    $scope.getPic = function(){
      $http.post('http://stark-eyrie-6720.herokuapp.com/picGet',
          {testInfo: 'testInfo recieved'}).error(function(err){
            // alert(err);
            $scope.showAlert("Internet connection could not be acheived at this time. Try again later.",null);
          }).then(function(res2){
              $scope.profPic=res2.data.imageData;
              PetService.setProfPic(res2.data.imageData);
               // alert($scope.profPic);
          });
        };


    $scope.goBack = function(){
         // PetService.setSingleView(false);
         // alert("here");
         // PetService.setSingleView(false);
         // alert("here");
         $event.stopPropagation();
          $ionicNavBarDelegate.back();
          // alert("here");
          // $ionicNavBarDelegate.showBackButton(false);
          // $scope.main.backBtn = false;
    };
$scope.closeMe = function(){
    $ionicNavBarDelegate.back();
  };

       $scope.createAccount = function(name,username,email,password){
        var illegalChars = /[^A-Za-z ]/;
        var illegalChars3 = /[^A-Za-z0-9_]/;
        var illegalChars2 = /[^A-Za-z0-9]/;
        // alert(name);
        // alert(/^[a-zA-Z]+$/.test(name));
        // var illegalChars3 = /[\(\)\<\>\,\;\:\\\"\[\]]/ ;
//add check for if name is taken
        if(!name){
          navigator.notification.alert(
            "Full name can't be blank.",
            null,         // callback
            "Couldn't Create Account"
          );
        }
        else if(name.length<2){
          navigator.notification.alert(
            'Full name is too short (minimum is 2 characters).',  // message
            null,         // callback
            "Couldn't Create Account"                 // buttonName
          );
        }
         else if(illegalChars.test(name)){
          navigator.notification.alert(
            'Use only letters for your name.',  // message
            null,         // callback
            "Couldn't Create Account"                 // buttonName
          );
        }
           else if(!username){
          navigator.notification.alert(
            "Username can't be blank.",  // message
            null,         // callback
            "Couldn't Create Account"                 // buttonName
          );
        }
        else if(illegalChars3.test(username)){
          navigator.notification.alert(
            'Use only numbers, letters and underscores for your username.',  // message
            null,         // callback
            "Couldn't Create Account"                 // buttonName
          );
        }

        else if(username.length<2){
          navigator.notification.alert(
            'Username is too short (minimum is 2 characters).',  // message
            null,         // callback
            "Couldn't Create Account"                 // buttonName
          );
        }
        else if(!email){
          navigator.notification.alert(
            'Please enter a valid email.',  // message
            null,         // callback
            "Couldn't Create Account"                 // buttonName
          );
        }
        else if(!password){
          navigator.notification.alert(
            'You must have a password.',  // message
            null,         // callback
            "Couldn't Create Account"                 // buttonName
          );
        }
        else if(illegalChars2.test(password)){
          navigator.notification.alert(
            'Use characters and numbers only for your password.',  // message
            null,         // callback
            "Couldn't Create Account"                 // buttonName
          );
        }
        else{
          // $scope.uploadPhoto = function(imageURI,username,name,email,password) {}
            $http.post('http://stark-eyrie-6720.herokuapp.com/createUser',
            {username: username,
            userFullName: name,
            userEmail: email,
            userPass: password,
            userPic: $scope.profPic
            }).then(function(res3){
              // alert(res3.data.user);
              // alert(res.user);
               PetService.setUser(res3.data.user);
               $scope.modal.remove();
               $state.go('app.login');
              // alert('success' );
            }).error(function(){
              // if(uploadRetry < 3){
                    // uploadRetry++;
                    // alert("retry");
                     // $scope.createAccount(name,username,email,password);
                // } else {
                 alert("An error has occurred: Code = " + error.code);
                // }
              })
        }
      };

  $scope.closeKeyboard = function() {
    // $scope.modal.hide();
    cordova.plugins.Keyboard.close();
  };
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  $scope.closeSignIn = function() {
    $scope.modal2.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  $scope.startModal = function(){

  };

  $scope.logTry= function(username,password){
         username = "ng225";
     password = "ikh";//change these///////////////////
    if(!username||!password){
       navigator.notification.alert(
            "Account/password can't be blank.",
            null,         // callback
            "Couldn't Log In"
          );
    }else{
      $http.post('http://stark-eyrie-6720.herokuapp.com/logInDP',
        {userInfo:{'password':password,'username':username}}).then(function (res1) {
       //    alert(res1.data.user);
       if(res1.data.user == 'false'){
        navigator.notification.alert(
          null,  // message
          null,         // callback
          'Sorry, your username or password was incorrect.'               // buttonName
        );
       }
       else{
          var watchList = PetService.getWatchList();
         var answerArray22 = [];

         res1.data.user.likes.forEach(function(entry) {
            for(y=0;y<watchList.length;y++){
              if(entry==watchList[y].watchName){
                answerArray22.push(watchList[y]);
              }
            }
          })
           res1.data.user.likes = answerArray22;
         PetService.setUser(res1.data.user);
              $scope.modal2.remove();
          $state.go('app.login');
            //  setTimeout(function() {
            //    $ionicScrollDelegate.scrollTop();
            // }, 200);

       }
      })
    }
  };

  $scope.startModal2 = function(){

  };

  $scope.joinDimepiece = function(){
    // if($scope.modal){
      $scope.modal.show();
    // }
    // else{
      // $scope.modal.show();
    // }
  };
    $scope.logInDimepiece = function(){
    // if(!$scope.modal2){
      // $scope.startModal2();
    // }
    // else{
      $scope.modal2.show();
    // }
  };



$scope.profPic = PetService.getProfPic();
// $scope.getUser();
 var uploadRetry = 0;
  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
    }).then(function(modal) {
      $scope.modal = modal;
    });

      $ionicModal.fromTemplateUrl('login-modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
    }).then(function(modal) {
      $scope.modal2 = modal;
    });





  // alert($scope.profPic.length);


  }) // end of back controller

  .controller('LoginCtrl', function ($scope, $ionicPlatform, $ionicActionSheet, $ionicNavBarDelegate, $ionicScrollDelegate, $ionicPopover, $ionicPopup, $http, $location, $ionicLoading ,OpenFB, $state, $stateParams, PetService) {
    // $scope.main = {};
    // alert(window.StatusBar);

$scope.goAmazon = function(link){
  window.open(link,"_system");
};

$scope.hasPics = function(watchLikes){
  var countAns = 0;
  for(x=0;x<watchLikes.length;x++){
    if(watchLikes[x].userPic.length>0){
      countAns++;
    }
  }
  return countAns;
}
$scope.hasPics2 = function(watchLikes){
  var countAns = 0;
  for(x=0;x<watchLikes.length;x++){
    if(watchLikes[x].userPic.length>0){
      countAns++;
    }
  }
  return (4-countAns);
  // if(countAns>4){
    // var x12 = ;
    // return 2;
  // }
  // else{
    // alert(x12);
    // if(countAns>4){
    //   return 0;
    // }else{

    // }
  // }
}

$scope.hasUserPic = function(like){
  if(like.userPic.length>0){
    // $scope.likesDis++;
    // alert(like);
    return like;
  }
};
$scope.hasNoUserPic = function(like){
  if(like.userPic.length==0){
    // $scope.likesDis++;
    // alert(like);
    return like;
  }
};
// $scope.like
$scope.goLoginPerson = function(like){
  // alert(like.username);
  // alert($scope.singlePerson.username);
  if(like.username!=$scope.singlePerson.username){
    $http.post('http://stark-eyrie-6720.herokuapp.com/getUser22',
          {username: like.username}).error(function(){
            navigator.notification.alert(
            'Connection not available.',  // message
            null,         // callback
            "Couldn't display user."                 // buttonName
          )
          }).then(function (res2) {
            // alert(res2.data.user.username);


          // alert(res1.data.watchList.listName);

          // $scope.events2 = res1.data.watchList.watchIndex;

          // var currUser =  res1.data.user;
          // alert($scope.watchList.length);
          if(res2.data.user=='false'){
            navigator.notification.alert(
            'User no longer exists.',  // message
            null,         // callback
            null                // buttonName
          )
          }else{
            var watchList = PetService.getWatchList();
           var answerArray23 = [];

           res2.data.user.likes.forEach(function(entry) {
              for(y=0;y<watchList.length;y++){
                if(entry==watchList[y].watchName){
                  answerArray23.push(watchList[y]);
                }
              }
            })
           res2.data.user.likes = answerArray23;
           PetService.setSinglePerson(res2.data.user);
            PetService.setProfileView2(true);
            $state.go('app.loginPerson');
             setTimeout(function() {
               $ionicScrollDelegate.scrollTop();
            }, 200);
          }

           // alert()
          })
  }else{
    // alert('here');
    $state.go('app.loginPerson');
  }


  // $scope.singlePerson = PetService.getSinglePerson();
  // alert(like);
};

$scope.goShopPerson = function(like){
  if(like.username!=$scope.singleShopPerson.username){
    $http.post('http://stark-eyrie-6720.herokuapp.com/getUser22',
          {username: like.username}).error(function(){
            navigator.notification.alert(
            'Connection not available.',  // message
            null,         // callback
            "Couldn't display user."                 // buttonName
          )
          }).then(function (res2) {
            // alert(res2);


          // alert(res1.data.watchList.listName);

          // $scope.events2 = res1.data.watchList.watchIndex;

          // var currUser =  res1.data.user;
          // alert($scope.watchList.length);
          if(res2.data.user=='false'){
            navigator.notification.alert(
            'User no longer exists.',  // message
            null,         // callback
            null                // buttonName
          )
          }else{
          var watchList = PetService.getWatchList();
           var answerArray23 = [];

           res2.data.user.likes.forEach(function(entry) {
              for(y=0;y<watchList.length;y++){
                if(entry==watchList[y].watchName){
                  answerArray23.push(watchList[y]);
                }
              }
            })
           res2.data.user.likes = answerArray23;
           PetService.setSingleShopPerson(res2.data.user);
             PetService.setProfileView3(true);
            $state.go('app.shopPerson');
             setTimeout(function() {
               $ionicScrollDelegate.scrollTop();
            }, 200);

           // alert()
         }
          });
  }else{
    $state.go('app.shopPerson');
  }


  // $scope.singlePerson = PetService.getSinglePerson();
  // alert(like);
};

$scope.goProfilePerson = function(like){
  if(like.username!=$scope.singleProfilePerson.username){
    $http.post('http://stark-eyrie-6720.herokuapp.com/getUser22',
            {username: like.username}).error(function(){
            navigator.notification.alert(
            'Connection not available.',  // message
            null,         // callback
            "Couldn't display user."                 // buttonName
          )
          }).then(function (res3) {


          // alert(res1.data.watchList.listName);

          // $scope.events2 = res1.data.watchList.watchIndex;

          // var currUser =  res1.data.user;
          // alert($scope.watchList.length);
          if(res3.data.user=='false'){
            navigator.notification.alert(
            null,  // message
            null,         // callback
            'User no longer exists.'                // buttonName
          )
          }else{
             var watchList = PetService.getWatchList();
           var answerArray24 = [];

           res3.data.user.likes.forEach(function(entry) {
              for(y=0;y<watchList.length;y++){
                if(entry==watchList[y].watchName){
                  answerArray24.push(watchList[y]);
                }
              }
            })
           res3.data.user.likes = answerArray24;
           PetService.setSingleProfilePerson(res3.data.user);
            PetService.setProfileView4(true);
           $state.go('app.profilePerson');
              setTimeout(function() {
               $ionicScrollDelegate.scrollTop();
            }, 200);

          }

           // alert()
          });
  }else{
    $state.go('app.profilePerson');
  }


  // $scope.singlePerson = PetService.getSinglePerson();
  // alert(like);
};

$scope.goCat = function(catName,catTag){
        // PetService.setShopSingle($scope.watchEx);
         // $scope.main.backBtn = false;
          // $state.go("app.shopDetail");
          // alert(catName);
        if(catName==$scope.catHeader){
          $state.go('app.singleShopCat');
       }else{
           PetService.setCatHead(catName);
              PetService.setCatTag(catTag);
          $state.go('app.singleShopCat');
         setTimeout(function() {
               $ionicScrollDelegate.scrollTop();
            }, 200);
      }
};

  $scope.expandCat = function (watch) {
       if(watch==$scope.singleShopWatch){
         $state.go('app.shopDetail');
       }else{
         PetService.setSingleShop(watch);
           $state.go('app.shopDetail');
         setTimeout(function() {
               $ionicScrollDelegate.scrollTop();
            }, 200);
      }
    };

       $scope.expandCat2 = function (watch) {
           if(watch==$scope.singleShopWatch2){
         $state.go('app.shopDetail2');
       }else{
         PetService.setSingleShop2(watch);
           $state.go('app.shopDetail2');
         setTimeout(function() {
               $ionicScrollDelegate.scrollTop();
            }, 200);
      }
    };

$scope.watchCat = function(watch){
  return (watch.tags.indexOf($scope.catTag)>-1);
};
$scope.relatedCol= function(watch){
  // alert(collection);
  return (watch!=$scope.singleWatch);
  // return (watch.tags.indexOf($scope.singleWatch.tags[1])>-1&&watch!=$scope.singleWatch);
};
$scope.relatedCategory = function(catAbrv){
  var catList = PetService.getCatList();
  for(x=0;x<catList.length;x++){
    if(catList[x].catTag==catAbrv){
      return catList[x].catName;
    }
  }
};
// $scope.true22 = false;
  $scope.expandProf = function (watch) {
       if(watch==$scope.singleProfileWatch){
         $state.go('app.profileDetail');
       }else{
         PetService.setSingleProfile(watch);
           $state.go('app.profileDetail');
         setTimeout(function() {
               $ionicScrollDelegate.scrollTop();
            }, 200);
      }
    };
        $scope.expandProf2 = function (watch) {
      if(watch==$scope.singleProfileWatch2){
         $state.go('app.profileDetail2');
       }else{
         PetService.setSingleProfile2(watch);
           $state.go('app.profileDetail2');
         setTimeout(function() {
               $ionicScrollDelegate.scrollTop();
            }, 200);
      }

    };
    // $scope.randomTag =


     $scope.refreshWatches = function(){
      // var userItem = $scope.userItem;
      // var notCount = $scope.userItem.notifications.length;
      // alert($scope.doAlert);
      // if($scope.doAlert == true){
        // alert("here");
      // $scope.doAlert = false;
      // var schoolName = $scope.userItem.userSchool;
      // var userEmail = $scope.userItem.userEmail;
    $http.post('http://stark-eyrie-6720.herokuapp.com/watchesGet',
          {testInfo: 'testInfo recieved'}).error(function(err){
            // alert(err);
            $scope.showAlert("Internet connection could not be acheived at this time. Try again later.",null);
          }).then(function (res1) {
          PetService.refreshWatches(res1.data.watchList.watchesIndex);
       }).then(function(){
              $scope.watchList = PetService.getWatchList();
             $scope.$broadcast('scroll.refreshComplete');
       });

        // alert(schoolName);
        //  $http.post('http://stark-eyrie-6720.herokuapp.com/watchesGet', {testInfo: 'testInfo recieved'})
        //  .error(function(err){
        //     alert(err);
        //        // $scope.scopeCards();
        //      // $scope.doAlert = true;
        //    $scope.$broadcast('scroll.refreshComplete');
        //   }).success(function(res2){
        //     // alert('here1');
        //   // alert(res.Item.schoolName)

        // // alert(PetService.refreshWatches());
        // alert(res2.data);
        //   // $scope.watchList = PetService.getWatches();
        //     $scope.$broadcast('scroll.refreshComplete');
        // })

    };
// window.open('http://apache.org', '_blank', 'location=yes');

    $scope.getCover = function(watchCover){
  if(watchCover==undefined){
    return "http://i62.tinypic.com/2zznq55.jpg";
  }
  else{
    return watchCover;
  }
    // PetService.setStart(false);
    // $scope.startCard = false;
    // alert($scope.cards[1]);
  };

     //allows sharing functionaility
    $scope.shareBtn = function(a,b,c,d){
      // analytics.trackEvent('button', 'click', 'share button', 1);
      // ga('send', 'event', 'button', 'click', 'share button', 1);
     window.plugins.socialsharing.share(a,b,c,d);
    };

    $scope.getWatches = function(){

          $http.post('http://stark-eyrie-6720.herokuapp.com/watchesGet',
          {testInfo: 'testInfo recieved'}).then(function (res1) {
          // alert(res1.data.watchList.listName);

          // $scope.events2 = res1.data.watchList.watchIndex;
          PetService.setWatchList(res1.data.watchList.watchesIndex);
          $scope.watchList = res1.data.watchList.watchesIndex;
         // alert(res1.data.watchList.watchesIndex);
       });

    };

    $scope.getWatchCats = function(){
          $http.post('http://stark-eyrie-6720.herokuapp.com/watchesGetCats',
          {testInfo: 'testInfo recieved'}).then(function (res1) {
              PetService.setCatList(res1.data.watchCatDoc.watchCats);
              $scope.shopCatList = res1.data.watchCatDoc.watchCats;
       });
    };
// $scope.setTabs = function(){}

      $scope.loginPrompt = function() {
           $state.go('app.loginPrompt');
             StatusBar.styleDefault();
    };
    //   $scope.goLogin = function(){

    // if(PetService.getSingleView()==true){
    //   $location.path('/app/event-detail');
    //    // $scope.main.backBtn = true;
    // }
    // else{
    //   // PetService.setBack(false);
    //     // StatusBar.styleLightContent();
    //   $location.path('/app/login');
    // }

    // };

    //   $scope.goBack = function(){
    //     // PetService.setBack(false);
    //    $ionicNavBarDelegate.back();
    //    // $scope.main.backBtn = true;
    // };
// $scope.getLikes = function(watch){
//       if(watch.watchLikes.length>0){
//           $http.post('http://stark-eyrie-6720.herokuapp.com/getLikes',
//                {
//                   likes: watch.watchLikes
//                 }).error(function(){
//                     return [];
//                 }).then(function(res){
//                     return res.data.userLikes;
//                 })
//       }else{
//            return [];
//       }
// };
        //expands single event
   $scope.go_here = function (watch) {
    // alert(watch.likesArray);
      if(watch==$scope.singleWatch){
            $state.go('app.eventDetail');
       }else{
        PetService.setSingle(watch);
        $state.go('app.eventDetail');
         setTimeout(function() {
               $ionicScrollDelegate.scrollTop();
            }, 200);
      }
    };
         $scope.go_here2 = function (watch) {
    if(watch==$scope.singleWatch2){
          $state.go('app.eventDetail2');
       }else{
        PetService.setSingle2(watch);
        $state.go('app.eventDetail2');
         setTimeout(function() {
               $ionicScrollDelegate.scrollTop();
            }, 200);
      }
    };

    $scope.getPhotos = function(){
    function onSuccess(base64string) {
       hideSheet();
         PetService.setProfPic(base64string);
        $scope.user.userPic = base64string;
         PetService.setUser($scope.user);
          $http.post('http://stark-eyrie-6720.herokuapp.com/picUpdate',
               {
                  username: $scope.user.username,
                  userPic: $scope.user.userPic
                });
    }
     function onFail(message) {
        hideSheet();
        alert('Failed because: ' + message);
     }

   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: 'Use camera' },
       { text: 'Choose from photo roll' }
     ],
     titleText: null,
     cancelText: '<b>Cancel</b>',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
      if(index==0){
          navigator.camera.getPicture(onSuccess, onFail, { quality: 85,
            allowEdit : true,
           targetWidth: 75,
           targetHeight: 75,
           destinationType: Camera.DestinationType.DATA_URL,
           encodingType: Camera.EncodingType.JPEG,
           sourceType : Camera.PictureSourceType.CAMERA
          });
      }else{
        navigator.camera.getPicture(onSuccess, onFail, { quality: 85,
            allowEdit : true,
           targetWidth: 75,
           targetHeight: 75,
           destinationType: Camera.DestinationType.DATA_URL,
           encodingType: Camera.EncodingType.JPEG,
           sourceType : Camera.PictureSourceType.PHOTOLIBRARY
          });
      }
     }
   });
}
    $scope.logUserOut= function() {
      PetService.logOut();
      // PetService.setUserPic("");
      $state.go('app.login');
    };

  $scope.settingProf = function(){
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<div class="logOut">Log Out</div>' },
       {  text: 'Support and Suggestions'},
       {  text: 'Change Photo'}
     ],
     titleText: null,
     cancelText: '<b>Cancel</b>',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
      if(index==0){
          hideSheet();
          $scope.logUserOut();
          // alert('log out');
      }else if(index==1){
        hideSheet();
        $scope.showPopup();
      }else{
        hideSheet();
        $scope.getPhotos();
     }
    }
    })
   };
   $scope.deleteCollection = function(collection){
   var deleteSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<p class="deleteCollectionText">Are you sure you want to delete this collection?</p>' },
       {  text: '<div class="logOut">Delete Collection</div>'}
     ],
     titleText: null,
     cancelText: '<b>Cancel</b>',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
      if(index==0){
        // index.preventDefault();
          // alert('log out');
      }else if(index==1){
         deleteSheet();
           // alert($scope.user.collections.indexOf(collection));
         $scope.user.collections.splice($scope.user.collections.indexOf(collection),1);
         $http.post('http://stark-eyrie-6720.herokuapp.com/updateCollection',
                 {
                    user: $scope.user
                  });
      }
    }
    })
   };
   $scope.showPopup = function() {
  $scope.data = {}

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<textarea style="border:.5px solid black;" ng-model="data.contactMessage" rows="8" cols="50"></textarea>',
    title: 'Send Us A Message',
    subTitle: 'Need help? Have a question? Want to suggest a change or watch for the app? <br> We\'d love to hear from you below:',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Send</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.contactMessage) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            $http.post('http://stark-eyrie-6720.herokuapp.com/userContactFormMessage',
              {username: $scope.user.username,
              emailAddress: $scope.user.userEmail,
              fullName: $scope.user.userFullName,
              message: $scope.data.contactMessage
              }).success(function(){
                // alert('here');
                 navigator.notification.alert(
                    null,  // message
                    null,         // callback
                    'Message Sent.'               // buttonName
                  );
                // $scope.showAlert("Your message has been sent.","Success!");
                // $location.path('/app/person/me/feed');
              }).error(function(){
                  navigator.notification.alert(
                    'If you see this repeatedly with a strong internet connection, please contact us at DimepieceApp@gmail.com',  // message
                    null,         // callback
                    'Failed to connect to server at this time.'               // buttonName
                  );
               // $scope.showAlert("Connection to the server could not be acheived at this time.","Failed.");
              })
          }
        }
      }
    ]
  });
 };

     $scope.expandPrice= function(event) {
     event.showPrice = !event.showPrice;
    };

     $scope.addWish= function(watch) {
       if($scope.user){
        // alert('here');
           // var user = $scope.user;
           // watch.liked = true;
           for(l=0;l<$scope.watchList.length;l++){
              if($scope.watchList[l].watchName==watch.watchName){
                watchLoc = l;
                $scope.watchList[watchLoc].liked =  true;
                 if($scope.watchList[watchLoc].watchLikes.length>9){
                    $scope.watchList[watchLoc].watchLikes.push({'username': $scope.user.username, 'userPic': ''});
                  }else{
                    $scope.watchList[watchLoc].watchLikes.push({'username': $scope.user.username, 'userPic': $scope.user.userPic});
                    // var user = $scope.user;
                  }
              }
            }
           // var watchLoc = $scope.watchList.indexOf(watch);
            $scope.user.likes.push(watch);
            PetService.setUser($scope.user);
            PetService.setWatchList($scope.watchList);
              // alert('here2');

              // alert('here3');


               // alert('here4');
              // PetService.setUser($scope.user);
         // PetService.setWatchList($scope.watchList);

           $http.post('http://stark-eyrie-6720.herokuapp.com/liked',
                 {
                    watchObj: watch,
                    user: $scope.user
                  });
       }
       else{
         $scope.loginPrompt();
       }
    };

    $scope.liked = function(watch){
      if($scope.user){
        for(p=0;p<$scope.user.likes.length;p++){
          if($scope.user.likes[p].watchName==watch.watchName){
            return true;
          }
        }
      }
    };

     $scope.removeWish= function(watch) {

         // watch.liked = false;
         // var watchLoc = $scope.watchList.indexOf(watch);
        for(l=0;l<$scope.watchList.length;l++){
          if($scope.watchList[l].watchName==watch.watchName){
            watchLoc = l;
                $scope.watchList[watchLoc].liked = false;
             // alert(watch.liked);
                 // alert($scope.watchList[watchLoc].watchLikes);
         $scope.watchList[watchLoc].watchLikes.splice($scope.watchList[watchLoc].watchLikes.indexOf({'username': $scope.user.username},1));
          }
        }
          // var watchLoc = $scope.watchList.indexOf(watch);
         // alert(watchLoc);
               // alert($scope.watchList[watchLoc].watchLikes[0]);


            // alert($scope.watchList[watchLoc].watchLikes);

              // alert($scope.watchList[watchLoc].watchLikes[0]);
            // watch.liked = !watch.liked;
            for(z=0;z<$scope.user.likes.length;z++){
               if($scope.user.likes[z].watchName==watch.watchName){
                $scope.user.likes.splice(z,1);
              }
            }


         PetService.setUser($scope.user);
            PetService.setWatchList($scope.watchList);

          // watch.watchLikes.splice(watchLikes.indexOf({'username': $scope.user.username},1));
              // alert(watch.liked);
          // $scope.singleProfileWatch.liked = false;
         // PetService.setUser($scope.user);
         // PetService.setWatchList($scope.watchList);

         // $scope.singleWatch.liked = !$scope.singleWatch.liked;
         $http.post('http://stark-eyrie-6720.herokuapp.com/unliked',
                 {
                    watchObj: watch,
                    username: $scope.user.username
                  });
    };
        $scope.addColl= function(collection,watch) {
       // if($scope.user){
        // alert('here');
           // var user = $scope.user;
           // watch.liked = true;
           // for(l=0;l<$scope.watchList.length;l++){
           //    if($scope.watchList[l].watchName==watch.watchName){
           //      watchLoc = l;
           //      $scope.watchList[watchLoc].liked =  true;
           //       if($scope.watchList[watchLoc].watchLikes.length>9){
           //          $scope.watchList[watchLoc].watchLikes.push({'username': $scope.user.username, 'userPic': ''});
           //        }else{
           //          $scope.watchList[watchLoc].watchLikes.push({'username': $scope.user.username, 'userPic': $scope.user.userPic});
           //          // var user = $scope.user;
           //        }
           //    }
           //  }
           // var watchLoc = $scope.watchList.indexOf(watch);
           // collection.selected = true;
           //push it to the collection locally
           //store it locally
           //push it to server

          if($scope.alreadyCollected(collection,watch)!=true){
                  for(x=0;x<$scope.user.collections.length;x++){
            if($scope.user.collections[x].collectionName==collection.collectionName){
              $scope.user.collections[x].watches.push(watch.watchName);
              PetService.setUser($scope.user);
            }
          }

          }else{
               var x = 0;
              while(x<$scope.user.collections.length){
                if($scope.user.collections[x].collectionName == collection.collectionName){
                  while($scope.user.collections[x].watches.indexOf(watch.watchName)>-1){
                    $scope.user.collections[x].watches.splice($scope.user.collections[x].watches.indexOf(watch.watchName), 1);
                    PetService.setUser($scope.user);
                  }
                }
                 x++;
              }
          }
            $http.post('http://stark-eyrie-6720.herokuapp.com/updateCollection',
                 {
                    user: $scope.user
                    // collectionName:collection.collectionName
                  });


              // collection.watches.push(watch.watchName);


            // }
           // }

            // PetService.setUser($scope.user);
            // PetService.setWatchList($scope.watchList);

              // alert('here2');

              // alert('here3');


               // alert('here4');
              // PetService.setUser($scope.user);
         // PetService.setWatchList($scope.watchList);


       // }
       // else{
         // $scope.loginPrompt();
       // }
    };
    $scope.alreadyCollected = function(collection,watch){
      if(collection.watches.indexOf(watch.watchName)>-1){
        return true;
      }


    }

    //used to throw better looking popup messages to user
    $scope.showAlert = function(message,title) {
      if(title==undefined){
        title=null;
      }
      $ionicPopup.alert({
        title: title,
        content: message
      }).then(function(res) {
        // console.log('Alert Shown.');
      });
    };

    $scope.alert2 = function(){
      $location.path('/app/loading');
    };

      $scope.toggleProf = function(){
      $scope.toggle = !$scope.toggle;
      PetService.setProfileView($scope.toggle);
      setTimeout(function() {
               $ionicScrollDelegate.resize();
            }, 150);
  // $scope.shouldBeOpen =
    };
     $scope.toggleProf2 = function(){
      $scope.toggle2 = !$scope.toggle2;
      PetService.setProfileView2($scope.toggle2);
      setTimeout(function() {
               $ionicScrollDelegate.resize();
            }, 150);
    };
     $scope.toggleProf3 = function(){
      $scope.toggle3 = !$scope.toggle3;
      PetService.setProfileView3($scope.toggle3);
      setTimeout(function() {
               $ionicScrollDelegate.resize();
            }, 150);
    };
     $scope.toggleProf4 = function(){
      $scope.toggle4 = !$scope.toggle4;
      PetService.setProfileView4($scope.toggle4);
      setTimeout(function() {
               $ionicScrollDelegate.resize();
            }, 150);
  // $scope.shouldBeOpen =
    };
    $scope.openPopover = function($event) {
      // alert('here');
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
    $scope.openAddCollection = function(watch) {
      if($scope.user){
        // PetService.setAddColl(watch);
        $scope.addCollWatch = watch;

          $ionicPopover.fromTemplateUrl('addCollection.html', {
            scope: $scope
          }).then(function(popover) {
            $scope.createNew=false;
            $scope.popover2 = popover;
            $scope.popover2.show();
          });


      }else{
           $scope.loginPrompt();
      }
    // $scope.newNot=false;
    // PetService.setNewNot(false);
  };

  $scope.createNewCollection = function(collName,watch){
    // alert('here');
    // alert($scope.user.collections[0].collectionName);
      var collectionExists = function(collections,collectionName2){
      for(x=0;x<collections.length;x++) {
          if(collections[x].collectionName == collectionName2){
            // alert('duplicate');
            return true;
          }
        }
      return false;
     };
     // alert();
     // alert();
    if(collName.length>0){
       if(collectionExists($scope.user.collections,collName)){
         navigator.notification.alert(
          null,  // message
          null,         // callback
          'You already have a collection with that name!'               // buttonName
        );
      }else{



    var watchArr = [watch.watchName];
    $scope.user.collections.push({'collectionName':collName,'watches': watchArr } );

            // $scope.createNew = false;
                cordova.plugins.Keyboard.close();
                  $http.post('http://stark-eyrie-6720.herokuapp.com/updateCollection',
                 {
                    user: $scope.user
                    // collectionName:collection.collectionName
                  });
                }
      }
            // $scope.thing123();
  };

  $scope.closeAddCollection = function() {
    $scope.popover2.hide();
    // $scope.createNew=false;
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover2.remove();
    // $scope.createNew=false;
  });
     $scope.getCollectionWatches = function(watchNameList){
          collectionArray=[];
             watchNameList.forEach(function(watch) {
              for(y=0;y<$scope.watchList.length;y++){
                if($scope.watchList[y].watchName==watch){
                  collectionArray.push($scope.watchList[y]);
                }
            }
          })
             return collectionArray;
        };
   $scope.expandProfileCollection = function(collection){
        var profileColl = {};
        profileColl.collectionName = collection.collectionName;
        profileColl.watches = $scope.getCollectionWatches(collection.watches);
        PetService.setProfileCollection(profileColl);
        $state.go('app.profileCollection');
        if(profileColl.collectionName!==$scope.profileCollection.collectionName){
         setTimeout(function() {
          $ionicScrollDelegate.scrollTop();
         }, 200);
        }
    };
    $scope.expandShopCollection = function(collection){
        var shopColl = {};
        shopColl.collectionName = collection.collectionName;
        shopColl.watches = $scope.getCollectionWatches(collection.watches);
        PetService.setShopCollection(shopColl);
        $state.go('app.shopCollection');
        if(shopColl.collectionName!==$scope.shopCollection.collectionName){
           setTimeout(function() {
            $ionicScrollDelegate.scrollTop();
           }, 200);
        }
    };
     $scope.expandLoginCollection = function(collection){
        var loginColl = {};
        loginColl.collectionName = collection.collectionName;
        loginColl.watches = $scope.getCollectionWatches(collection.watches);
        PetService.setLoginCollection(loginColl);
        $state.go('app.loginCollection');
        if(loginColl.collectionName!==$scope.shopCollection.collectionName){
           setTimeout(function() {
            $ionicScrollDelegate.scrollTop();
           }, 200);
        }
     };

     $scope.showSel = function(feed){
      if($scope.feed!=feed){

               $ionicScrollDelegate.scrollTop();

       $scope.feed = feed;
       PetService.setFeed(feed);
      }
      // setTimeout(function() {
      //    $scope.openPopover();
      // }, 100);
    };
    $scope.collectionWatchPic = function(watchName){
       if(watchName !== null && typeof watchName !== 'object'){
        for(p=0;p<$scope.watchList.length;p++){
          // alert($scope.watchList[p].watchName);
          if($scope.watchList[p].watchName==watchName){
            return $scope.watchList[p].watchPhoto;
          }
        }
      }else{
        return watchName.watchPhoto;
      }
    };
      $scope.scrollTop = function() {
        $ionicScrollDelegate.scrollTop(true);
    };


$scope.newCollBtn = function(){

  $scope.createNew = true;
   // setTimeout(function() {
               // $ionicScrollDelegate.resize();
            // }, 200);
  // $scope.shouldBeOpen = true;
 // $scope.$broadcast("newItemAdded");
}
// cordova.plugins.Keyboard.close();
// cordova.plugins.Keyboard.automaticScrollToTopOnHiding = true;
     $scope.toggle=PetService.getProfileView();
     $scope.toggle2=PetService.getProfileView2();
     $scope.toggle3=PetService.getProfileView3();
     $scope.toggle4=PetService.getProfileView4();
     $scope.singleWatch = PetService.getSingle();
     $scope.singleWatch2 = PetService.getSingle2();
     $scope.singleShopWatch = PetService.getSingleShop();
     $scope.singleShopWatch2 = PetService.getSingleShop2();
     $scope.singleProfileWatch = PetService.getSingleProfile();
     $scope.singleProfileWatch2 = PetService.getSingleProfile2();
     $scope.singlePerson = PetService.getSinglePerson();
     $scope.singleShopPerson = PetService.getSingleShopPerson();
     $scope.singleProfilePerson = PetService.getSingleProfilePerson();
     $scope.profileCollection = PetService.getProfileCollection();
     $scope.shopCollection = PetService.getShopCollection();
     $scope.loginCollection = PetService.getLoginCollection();


    if(PetService.getWatchList().length==0){
         setTimeout(function() {
          navigator.splashscreen.hide();
        }, 1000);
      $scope.getWatches();
      $scope.getWatchCats();
    }
    $scope.feed =  PetService.getFeed();
    $scope.watchList = PetService.getWatchList();
    $scope.shopCatList = PetService.getCatList();
    $scope.user = PetService.getUser();
    $scope.catHeader = PetService.getCatHead();
    $scope.catTag = PetService.getCatTag();
    $scope.loadLimit=20;
    $scope.createNew=false;
    $scope.newCollectionName=null;
    $scope.searchShow = false;
     // $scope.showNav();

    // $scope.addCollWatch = PetService.getAddColl();

     $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;

  });

//     $timeout(function(){
//   $ionicScrollDelegate.scrollTop();
// },50)




    // }
    // $scope.doThis2=function(){
    //   // $scope.showAlert("Connection to the server could not be acheived at this time. Increase your WiFi/service or try again later.","Failed.");
    //   $scope.showAlert("We couldn't verify that as a valid university email. Make sure you are on the right portal for your respective university, and that you entered your OWN valid email. If you are in fact a student at this school, and continue to experience trouble, shoot us an email at UNightlifeTeam@gmail.com.");
    //   $scope.showAlert('Facebook connection failed.');
    //   $scope.showAlert("Event Added to Your Calendar.");
    // }

  }) // end of login controller

.directive('focusMe', function($timeout) {
  return {
    scope: { trigger: '@focusMe' },
    link: function(scope, element) {
      scope.$watch('trigger', function(value) {
        if(value === "true") {
          $timeout(function() {
            element[0].focus();
          });
        }
      });
    }
  };
});
