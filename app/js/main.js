;(function (){

  'use strict';

  var vanilla = 'vanilla';

  angular.module('app', ['firebase', 'ui.router', 'ngMaterial'])

    .config(['$sceProvider', '$stateProvider',
      function($sceProvider, $stateProvider) {

        $stateProvider
          .state('app', {
            url: '',
            templateUrl: 'js/home/home.tpl.html',
            controller: 'appController'
          })
          .state('room', {
            url: '/room/:roomId',
            templateUrl: 'js/room/room.tpl.html',
            controller: 'roomController'
          })
          .state('roomJS', {
            url: '/room/js/:roomId',
            templateUrl: 'js/room/roomJS.tpl.html',
            controller: 'roomJSController'
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
