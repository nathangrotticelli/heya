angular.module('sociogram.controllers', ['ionic'])

  //for side menu
  .controller('AppCtrl', function ($scope, $state,PetService) {

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

     $scope.shareBtn = function(a,b,c,d){
     window.plugins.socialsharing.share(a,b,c,d);
       if(typeof analytics !== undefined) {
                   analytics.trackEvent("ShareClick", "Singe Watch Share Button Clicked", b, 1);
                }
                $http.post('http://stark-eyrie-6720.herokuapp.com/shareCount');
    };
  })

.controller('BackCtrl', function ($scope,$ionicActionSheet, $ionicModal,  $ionicPopover, $ionicPlatform, $ionicNavBarDelegate, $ionicScrollDelegate, $ionicPopup, $http, $location, $ionicLoading , $state, PetService) {

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

         $event.stopPropagation();
          $ionicNavBarDelegate.back();

    };
$scope.closeMe = function(){
  // $state.go('app.login');
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
              if(res3.data.failed){
                navigator.notification.alert(
                  res3.data.failed,  // message
                  null,         // callback
                  "Couldn't Create Account"                 // buttonName
                );
                // alert(res3.data.failed);
              }else{
                PetService.setUser(res3.data.user);
               $scope.modal.remove();
               $state.go('app.login');
              }
              // alert(res3.data.user);
              // alert(res.user);

              // alert('success' );
            });
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

  $scope.logTry= function(username,password){
         // username = "ng225";
     // password = "ikh";
     //auto login dummy creds///////////////////
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
          'Sorry, your username/email or password was incorrect.'               // buttonName
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
            if(typeof analytics !== undefined) {
                   analytics.trackEvent("UserLogIn", "Successful User Re-Log In", res1.data.user.username, 1);
                }
                $http.post('http://stark-eyrie-6720.herokuapp.com/loginCount');
            //  setTimeout(function() {
            //    $ionicScrollDelegate.scrollTop();
            // }, 65);

       }
      })
    }
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

  .controller('LoginCtrl', function ($scope, $ionicPlatform, $ionicActionSheet, $ionicNavBarDelegate, $ionicScrollDelegate, $ionicPopover, $ionicPopup, $http, $ionicLoading , $state, PetService) {
    // $scope.main = {};
    // alert(window.StatusBar);


$scope.goAmazon = function(link){
  window.open(link,"_system");
    if(typeof analytics !== undefined) {
         analytics.trackEvent("AmazonClick", "Singe Watch Amazon Button Clicked", link, 1);
      }
      $http.post('http://stark-eyrie-6720.herokuapp.com/productLinkCount');
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
    return like;
  }
};
$scope.hasNoUserPic = function(like){
  if(like.userPic.length==0){
    return like;
  }
};

$scope.goLoginPerson = function(like){
  if(like.username!=$scope.singlePerson.username){
    $http.post('http://stark-eyrie-6720.herokuapp.com/getUser22',
          {username: like.username}).error(function(){
            navigator.notification.alert(
            'Connection not available.',  // message
            null,         // callback
            "Couldn't display user."                 // buttonName
          )
          }).then(function (res2) {
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
                if(typeof analytics !== undefined) {
                   analytics.trackEvent("PersonClicked", "Profile Person Clicked", res2.data.user.username, 1);
                }
            }, 65);
          }
          })
  }else{
    $state.go('app.loginPerson');
  }
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
                if(typeof analytics !== undefined) {
                   analytics.trackEvent("PersonClicked", "Profile Person Clicked", res2.data.user.username, 1);
                }
            }, 65);

           // alert()
         }
          });
  }else{
    $state.go('app.shopPerson');
  }
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
                if(typeof analytics !== undefined) {
                   analytics.trackEvent("PersonClicked", "Profile Person Clicked", res3.data.user.username, 1);
                  // analytics.trackView("Watch Login Feed");
                }
            }, 65);

          }
          });
  }else{
    $state.go('app.profilePerson');
  }
};

$scope.goCat = function(catName,catTag){
        if(catName==$scope.catHeader){
          $state.go('app.singleShopCat');
       }else{
           PetService.setCatHead(catName);
              PetService.setCatTag(catTag);
          $state.go('app.singleShopCat');
         setTimeout(function() {
               $ionicScrollDelegate.scrollTop();
                if(typeof analytics !== undefined) {
                   analytics.trackEvent("WatchCategory", "watch cat clicked", catName, 1);
                }
            }, 65);
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
            }, 65);
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
            }, 65);
      }
    };

$scope.watchCat = function(watch){
  return (watch.tags.indexOf($scope.catTag)>-1);
};
$scope.relatedCol= function(watch){
  return (watch.watchName!=$scope.singleWatch.watchName&&watch.watchName!=$scope.singleWatch2.watchName);
};
$scope.relatedShopCol= function(watch){
  return (watch.watchName!=$scope.singleShopWatch.watchName&&watch.watchName!=$scope.singleShopWatch2.watchName);
};
$scope.relatedProfCol= function(watch){
  return (watch.watchName!=$scope.singleProfileWatch.watchName&&watch.watchName!=$scope.singleProfileWatch2.watchName);
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
            }, 65);
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
            }, 65);
      }

    };
    // $scope.randomTag =


     $scope.refreshWatches = function(){

    $http.post('http://stark-eyrie-6720.herokuapp.com/watchesGet',
          {testInfo: 'testInfo recieved'}).error(function(err){
            // alert(err);
            $scope.showAlert("Internet connection could not be acheived at this time. Try again later.",null);
            $scope.$broadcast('scroll.refreshComplete');
          }).then(function (res1) {
          PetService.refreshWatches(res1.data.watchList.watchesIndex);
       }).then(function(){
              $scope.watchList = PetService.getWatchList();
              $scope.getWatchCats();
             $scope.$broadcast('scroll.refreshComplete');
       });
    };

    $scope.getCover = function(watchCover){
  if(watchCover==undefined){
    return "http://i62.tinypic.com/2zznq55.jpg";
  }
  else{
    return watchCover;
  }
  };

     //allows sharing functionaility
    $scope.shareBtn = function(a,b,c,d){
     window.plugins.socialsharing.share(a,b,c,d);
      if(typeof analytics !== undefined) {
                   analytics.trackEvent("ShareClick", "Singe Watch Share Button Clicked", b, 1);
                }
                $http.post('http://stark-eyrie-6720.herokuapp.com/shareCount');
    };

    $scope.getWatches = function(){

          $http.post('http://stark-eyrie-6720.herokuapp.com/watchesGet',
          {testInfo: 'testInfo recieved'}).then(function (res1) {
          PetService.setWatchList(res1.data.watchList.watchesIndex);
          $scope.watchList = res1.data.watchList.watchesIndex;
       });

    };

    $scope.getWatchCats = function(){
          $http.post('http://stark-eyrie-6720.herokuapp.com/watchesGetCats',
          {testInfo: 'testInfo recieved'}).then(function (res1) {
              PetService.setCatList(res1.data.watchCatDoc.watchCats);
              $scope.shopCatList = res1.data.watchCatDoc.watchCats;
       });
    };

      $scope.loginPrompt = function() {
           $state.go('app.loginPrompt');
    };
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
            }, 65);
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
            }, 65);
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
          for(x=0;x<$scope.watchList.length;x++){
            for(y=0;y<$scope.watchList[x].watchLikes.length;y++){
              if($scope.watchList[x].watchLikes[y].username == $scope.user.username){
                 $scope.watchList[x].watchLikes[y].userPic = $scope.user.userPic;
                 PetService.setWatchList($scope.watchList);
             }
           }
         }
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
      $state.go('app.login');
      setTimeout(function() {
          $ionicScrollDelegate.scrollTop();
         }, 65);
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
       if($scope.user&&!watch.liked){
        // alert(watch.liked);
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
      if(watch.liked){
        for(l=0;l<$scope.watchList.length;l++){
          if($scope.watchList[l].watchName==watch.watchName){
            watchLoc = l;
                $scope.watchList[watchLoc].liked = false;

                 function findWithAttr(array, attr, value) {
                      for(var i = 0; i < array.length; i += 1) {
                          if(array[i][attr] === value) {
                              return i;
                          }
                      }
                  }
                 var userLikePos = findWithAttr($scope.watchList[watchLoc].watchLikes, 'username', $scope.user.username);
                 // alert(userLikePos); // returns 0
                $scope.watchList[watchLoc].watchLikes.splice(userLikePos,1);
          }
        }
           for(z=0;z<$scope.user.likes.length;z++){
               if($scope.user.likes[z].watchName==watch.watchName){
                $scope.user.likes.splice(z,1);
              }
            }


         PetService.setUser($scope.user);
            PetService.setWatchList($scope.watchList);

         $http.post('http://stark-eyrie-6720.herokuapp.com/unliked',
                 {
                    watchObj: watch,
                    username: $scope.user.username
                  });
        }

    };
        $scope.addColl= function(collection,watch) {
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
            }, 165);
    };
     $scope.toggleProf2 = function(){
      $scope.toggle2 = !$scope.toggle2;
      PetService.setProfileView2($scope.toggle2);
      setTimeout(function() {
               $ionicScrollDelegate.resize();
            }, 165);
    };
     $scope.toggleProf3 = function(){
      $scope.toggle3 = !$scope.toggle3;
      PetService.setProfileView3($scope.toggle3);
      setTimeout(function() {
               $ionicScrollDelegate.resize();
            }, 165);
    };
     $scope.toggleProf4 = function(){
      $scope.toggle4 = !$scope.toggle4;
      PetService.setProfileView4($scope.toggle4);
      setTimeout(function() {
               $ionicScrollDelegate.resize();
            }, 165);
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
  };

  $scope.createNewCollection = function(collName,watch){
      var collectionExists = function(collections,collectionName2){
      for(x=0;x<collections.length;x++) {
          if(collections[x].collectionName == collectionName2){
            // alert('duplicate');
            return true;
          }
        }
      return false;
     };
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
         }, 65);
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
           }, 65);
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
           }, 65);
        }
     };

     $scope.showSel = function(feed){
      if($scope.feed!=feed){

               $ionicScrollDelegate.scrollTop();

       $scope.feed = feed;
       PetService.setFeed(feed);
      }
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
}


    if(PetService.getWatchList().length==0){
         setTimeout(function() {
          navigator.splashscreen.hide();
            if(typeof analytics !== undefined) {
              analytics.trackView("Watch Login Feed");
            }
             $http.post('http://stark-eyrie-6720.herokuapp.com/openCount');
          }, 1000);
      $scope.getWatches();
      $scope.getWatchCats();
    }

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
    $scope.feed =  PetService.getFeed();
    $scope.watchList = PetService.getWatchList();
    $scope.shopCatList = PetService.getCatList();
    $scope.user = PetService.getUser();
    $scope.catHeader = PetService.getCatHead();
    $scope.catTag = PetService.getCatTag();
    $scope.loadLimit=30;
    $scope.createNew=false;
    $scope.newCollectionName=null;
    $scope.searchShow = false;


     $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;

  });

  }) // end of login controller

.directive('focusMe', function($timeout) {
  return {
    link: function(scope, element, attrs) {
      $timeout(function() {
        element[0].focus();
        // if(ionic.Platform.isAndroid()){
        //    cordova.plugins.Keyboard.show();
        // }
      }, 150);
    }
  };
});
