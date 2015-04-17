angular.module('sociogram', ['ionic', 'openfb','objectFilters','sociogram.controllers','sociogram.services','ionic.contrib.ui.cards'])

    .run(function ($rootScope, $state, $ionicPlatform, $window, OpenFB) {

        // OpenFB.init('1474435556106076');
 // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
 //      $ionicHistory.clearCache();
 //   });
 // alert($window.StatusBar);
    // StatusBar.styleDefault();
      // alert($cordovaStatusbar);
      // alert(StatusBar);
        // alert('here');
        // alert(window.StatusBar);
        // alert(StatusBar.hide);
//         if(window.StatusBar) {
//             alert("here");
//             StatusBar.backgroundColorByName("red");
//   // org.apache.cordova.statusbar required
//    // StatusBar.styleDefault(); // this should set it white
// }

// alert(wino);
  $ionicPlatform.ready(function () {

      if(window.cordova.plugins.Keyboard) {
         cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
         cordova.plugins.Keyboard.disableScroll(true);
       }
            if (window.StatusBar) {
              // alert('ere');
                // StatusBar.hide();
                // StatusBar.styleLightContent();
                // alert($cordovaStatusBar);
                // $cordovaStatusBar.style(1);
                // StatusBar.backgroundColorByName("green");
                // alert('here');

                StatusBar.overlaysWebView(true);
                // StatusBar.styleLightContent();
                StatusBar.styleDefault();
            }
            if (typeof analytics !== undefined){
              analytics.startTrackerWithId('UA-61870137-1');
            }
            else
            {
             console.log("Google Analytics plugin could not be loaded.")
            }
            //  if (typeof analytics !== 'undefined'){
            //   analytics.startTrackerWithId('UA-61870137-1');
            // }
            // else
            // {
            //  console.log("Google Analytics plugin could not be loaded.")
            // }
            // if(window.analytics){
            //  analytics.startTrackerWithId('UA-61870137-1');
            // }

            // if(window.analytics){
            //
            // }
            // if(analytics){
            //   analytics.startTrackerWithId('UA-53156722-1');
            // }




// && toState.name !== "app.logout"
        });

        // $rootScope.$on('$stateChangeStart', function(event, toState) {

        //     if (toState.name !== "app.login" && toState.name !== "app.loading") {
        //         $state.go('app.login');
        //         event.preventDefault();
        //     }
        // });

        // $rootScope.$on('OAuthException', function() {
        //     $state.go('app.login');
        // });

    })


    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

          .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: "AppCtrl"
            })

            .state('app.login', {
                        url: "/login",
                        views: {
                            'login': {
                                templateUrl: "templates/login.html",
                                controller: "LoginCtrl"
                            }
                        }
                 })

             .state('app.eventDetail', {
                      url: "/eventDetail",
                      views: {
                        'login': {
                          templateUrl: 'templates/eventDetail.html',
                          controller: "LoginCtrl"
                        }
                      }
                  })
               .state('app.eventDetail2', {
                      url: "/eventDetail2",
                      views: {
                        'login': {
                          templateUrl: 'templates/eventDetail2.html',
                          controller: "LoginCtrl"
                        }
                      }
                  })
                 .state('app.loginPerson', {
                      url: "/loginPerson",
                      views: {
                        'login': {
                          templateUrl: 'templates/loginPerson.html',
                          controller: "LoginCtrl"
                        }
                      }
                  })
                      .state('app.shopPerson', {
                      url: "/shopPerson",
                      views: {
                        'shop': {
                          templateUrl: 'templates/shopPerson.html',
                          controller: "LoginCtrl"
                        }
                      }
                  })
                   .state('app.profilePerson', {
                      url: "/profilePerson",
                      views: {
                        'profile': {
                          templateUrl: 'templates/profilePerson.html',
                          controller: "LoginCtrl"
                        }
                      }
                  })
                   .state('app.shopCollection',{
                    url:"/shopCollection",
                    views:{
                      'shop':{
                        templateUrl: 'templates/shopCollection.html',
                        controller: "LoginCtrl"
                      }
                    }
                   })
                  .state('app.profileCollection', {
                      url: "/profileCollection",
                      views: {
                        'profile': {
                          templateUrl: 'templates/profileCollection.html',
                          controller: "LoginCtrl"
                        }
                      }
                  })
                    .state('app.loginCollection', {
                      url: "/loginCollection",
                      views: {
                        'login': {
                          templateUrl: 'templates/loginCollection.html',
                          controller: "LoginCtrl"
                        }
                      }
                  })
              .state('app.singleShopCat', {
                      url: "/singleShopCat",
                      views: {
                        'shop': {
                          templateUrl: 'templates/singleShopCat.html',
                          controller: "LoginCtrl"
                        }
                      }
                  })
            .state('app.loginPrompt', {
                      url: "/loginPrompt",
                      views: {
                        'loginPrompt': {
                          templateUrl: 'templates/loginPrompt.html',
                          controller: "BackCtrl"
                        }
                      }
                  })
                    .state('app.shop', {
                      url: "/shop",
                      views: {
                        'shop': {
                          templateUrl: 'templates/shop.html',
                          controller: "LoginCtrl"
                        }
                      }
                  })
                         .state('app.shopDetail', {
                      url: "/shopDetail",
                      views: {
                        'shop': {
                          templateUrl: 'templates/shopDetail.html',
                          controller: "LoginCtrl"
                        }
                      }
                  })
                             .state('app.shopDetail2', {
                      url: "/shopDetail2",
                      views: {
                        'shop': {
                          templateUrl: 'templates/shopDetail2.html',
                          controller: "LoginCtrl"
                        }
                      }
                  })
                    .state('app.profileDetail', {
                      url: "/profileDetail",
                      views: {
                        'profile': {
                          templateUrl: 'templates/profileDetail.html',
                          controller: "LoginCtrl"
                        }
                      }
                  })
                     .state('app.profileDetail2', {
                      url: "/profileDetail2",
                      views: {
                        'profile': {
                          templateUrl: 'templates/profileDetail2.html',
                          controller: "LoginCtrl"
                        }
                      }
                  })
            .state('app.logout', {
                url: "/logout",
                views: {
                    'login': {
                        templateUrl: "templates/logout.html",
                        controller: "LogoutCtrl"
                    }
                }
            })
            //   .state('app.friends', {
            //     url: "/friends",
            //     views: {
            //         'login': {
            //             templateUrl: "templates/friends.html",
            //             controller: "FeedCtrl"
            //         }
            //     }
            // })

            .state('app.profile', {
                url: "/profile",
                views: {
                    'profile': {
                        templateUrl: "templates/profile.html",
                        controller: "LoginCtrl"
                    }
                }
            })
            .state('app.about', {
                      url: '/about',
                      views: {
                        'login': {
                          templateUrl: 'templates/about.html',
                          controller: 'LoginCtrl'
                        }
                      }
                    })
                     .state('app.loading', {
                      url: '/loading',
                      views: {
                        'login': {
                          templateUrl: 'templates/loading.html',
                          controller: 'LoginCtrl'
                        }
                      }
                    })
                    .state('app.help', {
                      url: '/help',
                      views: {
                        'login': {
                          templateUrl: 'templates/help.html',
                          controller: 'LoginCtrl'
                        }
                      }
                    })
                     .state('app.privacy', {
                      url: '/privacy',
                      views: {
                        'login': {
                          templateUrl: 'templates/privacy.html',
                          controller: 'LoginCtrl'
                        }
                      }
                    })
                        .state('app.addAnEvent', {
                      url: '/addAnEvent',
                      views: {
                        'login': {
                          templateUrl: 'templates/addAnEvent.html',
                          controller: 'LoginCtrl'
                        }
                      }
                    })
                        .state('app.newEventForm', {
                      url: '/newEventForm',
                      views: {
                        'newEventForm': {
                          templateUrl: 'templates/newEventForm.html',
                          controller: 'LoginCtrl'
                        }
                      }
                    })

            .state('app.person', {
                url: "/person/:personId",
                views: {
                    'login': {
                        templateUrl: "templates/person.html",
                        controller: "LoginCtrl"
                    }
                }
            })
            .state('app.feed', {
                url: "/person/:personId/feed",
                views: {
                    'login': {
                        templateUrl: "templates/feed.html",
                        controller: "LoginCtrl"
                    }
                }
            });

        // fallback route
        $urlRouterProvider.otherwise('/app/login');

    });
