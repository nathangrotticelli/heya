angular.module('sociogram', ['ionic', 'objectFilters','sociogram.controllers','sociogram.services'])

    .run(function ($rootScope, $state, $ionicPlatform, $window) {

  $ionicPlatform.ready(function () {

      if(window.cordova.plugins.Keyboard) {
         cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
         cordova.plugins.Keyboard.disableScroll(true);
       }
            if (window.StatusBar) {
                StatusBar.overlaysWebView(true);
                StatusBar.styleDefault();
            }
            if (typeof analytics !== undefined){
              analytics.startTrackerWithId('UA-61870137-1');
            }
            else
            {
             console.log("Google Analytics plugin could not be loaded.")
            }
        });
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
            .state('app.profile', {
                url: "/profile",
                views: {
                    'profile': {
                        templateUrl: "templates/profile.html",
                        controller: "LoginCtrl"
                    }
                }
            });

        // fallback route
        $urlRouterProvider.otherwise('/app/login');

    });
