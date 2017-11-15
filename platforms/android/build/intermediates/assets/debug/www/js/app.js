// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova', 'starter.controllers','starter.camera.controllers','analytics','ngCordova.plugins.push_v5'])

.run(function($ionicPlatform,$http,$cordovaPushV5) {
     
     
     var notifications = [];
     var options = {
     android: {
  	  senderID: "12345679"
     },
     ios: {
     alert: "true",
     badge: "true",
     sound: "true"
     },
     windows: {}
     };
     
     // initialize
     
//     var push = PushNotification.init({
//                                      android: {
//                                      },
//                                      browser: {
//                                      pushServiceURL: 'http://push.api.phonegap.com/v1/push'
//                                      },
//                                      ios: {
//                                      alert: "true",
//                                      badge: true,
//                                      sound: 'false'
//                                      },
//                                      windows: {}
//                                      });
//     
//     push.on('registration', function(data) {
//             alert(data.registrationId);
//             alreadyRegistered = true;
//             $http.get('http://www.getwellbyoga.com/yoga/store_token.php?token='+result).then(function(resp) {});
//             
//             
//             
//                 });


     
     
     
     $ionicPlatform.ready(function() {
                          
                          //alert("ready");
                          $cordovaPushV5.initialize(options).then(function() {
                                                                  // start listening for new notifications
                                                                  $cordovaPushV5.onNotification();
                                                                  // start listening for errors
                                                                  $cordovaPushV5.onError();
                                                                  
                                                                  // register to get registrationId
                                                                  $cordovaPushV5.register().then(function(registrationId) {
                                                                                                 //alert(registrationId);
                                                                                                  $http.get('http://www.getwellbyoga.com/yoga/store_token.php?token='+registrationId).then(function(resp) {});
                                                                                                 // save `registrationId` somewhere;
                                                                                                 })
                                                                  });

                          register();
                          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                          // for form inputs)
                          if (window.cordova && window.cordova.plugins.Keyboard) {
                          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                          cordova.plugins.Keyboard.disableScroll(true);
                          
                          }
                          if (window.StatusBar) {
                          // org.apache.cordova.statusbar required
                          StatusBar.styleDefault();
                          }
                          
                         
                          
                          
                          });
     })

.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
        .state('app', {
               url: '/app',
               abstract: true,
               templateUrl: 'templates/menu.html',
               controller: 'AppCtrl'
               })
        
        .state('app.home', {
               url: '/home',
               views: {
               'menuContent': {
               templateUrl: 'templates/home.html',
               reload: true
               
               }
               }
               })
        
        .state('app.home1', {
               url: '/home1',
               views: {
               'menuContent': {
               templateUrl: 'templates/home1.html',
               reload: true
               
               }
               }
               })
        
        
       
        .state('app.feedback', {
               url: '/feedback',
               views: {
               'menuContent': {
               templateUrl: 'templates/feedback.html',
               reload: true
               
               }
               }
               })
        
        .state('app.faverites', {
               url: '/faverites',
               views: {
               'menuContent': {
               templateUrl: 'templates/faverites.html',
               reload: true
               
               }
               }
               })
        
               
        .state('app.quickfix', {
               url: '/quickfix/:type',
               views: {
               'menuContent': {
               templateUrl: 'templates/quickfix.html',
               reload: true
               
               }
               }
               })
        
        .state('app.allvids', {
               url: '/allvids',
               views: {
               'menuContent': {
               templateUrl: 'templates/allvids.html',
               reload: true
               
               }
               }
               })
        
        .state('app.yogadownload', {
               url: '/yogadownload/:type',
               views: {
               'menuContent': {
               templateUrl: 'templates/yogadownload.html',
               reload: true
               
               }
               }
               })

      
              
        
        .state('app.intro', {
               url: '/intro',
               views: {
               'menuContent': {
               templateUrl: 'templates/policy.html',
               reload: true
               
               }
               }
               })

               
               .state('app.showmedia', {
               url: '/media/:url',
               views: {
               'menuContent': {
               templateUrl: 'templates/yogamedia.html',
               reload: true
               
               }
               }
               })
        
        .state('app.fixes', {
               url: '/fixes/:type',
               views: {
               'menuContent': {
               templateUrl: 'templates/yoga.html',
               reload: true
               
               }
               }
               })
        
        
        .state('app.types', {
               url: '/types/:type',
               views: {
               'menuContent': {
               templateUrl: 'templates/yogatype.html',
               reload: true
               
               }
               }
               })
             .state('app.policy', {
               url: '/policy',
               views: {
               'menuContent': {
               templateUrl: 'templates/policy.html'
               
               }
               }
               });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
        });
