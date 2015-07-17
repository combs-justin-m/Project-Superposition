;(function (){

  'use strict';

  var vanilla = 'vanilla';

  angular.module('app', ['firebase', 'ui.router', 'ngMaterial'])

    .config(['$sceProvider', '$stateProvider',
      function($sceProvider, $stateProvider) {

        $stateProvider
          .state('app', {
            url: '/',
            templateUrl: 'js/home/home.tpl.html',
            controller: 'appController'
          })
          .state('roomRR', {
            url: '/room/roundrobin/:roomId',
            templateUrl: 'js/room/roomRR.tpl.html',
            controller: 'roomController',
            resolve: {
              "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireAuth();
              }]
            }
          })
          .state('roomFFA', {
            url: '/room/freeforall/:roomId',
            templateUrl: 'js/room/roomFFA.tpl.html',
            controller: 'roomController',
            resolve: {
              "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireAuth();
              }]
            }
          })
          .state('room', {
            url: '/room/:roomId',
            templateUrl: 'js/room/room.tpl.html',
            controller: 'roomController'
            // resolve: {
            //   "currentAuth": ["Auth", function(Auth) {
            //     return Auth.$requireAuth();
            //   }]
            // }
          })
          .state('roomWB', {
            url: '/room/whiteboard/:roomId',
            templateUrl: 'js/room/roomWB.tpl.html',
            controller: 'roomWBController',
            resolve: {
              "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireAuth();
              }]
            }
          });

        // Completely disable SCE.  For demonstration purposes only!
        // Do not use in production.
        $sceProvider.enabled(false);

    }])

    .run(["$rootScope", "$state",
      function($rootScope, $state) {
        $rootScope.$on("$stateChangeError", function(error) {
          if (error === "AUTH_REQUIRED") {
            $state.go("app");
          }
      });
    }])

}());
