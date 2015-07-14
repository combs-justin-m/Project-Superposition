;(function (){

  'use strict';

  angular.module('app', ['firebase', 'ui.router', 'ngMaterial'])

    .config(['$sceProvider', '$stateProvider',
      function($sceProvider, $stateProvider) {

        $stateProvider
          .state('app', {
            url: '',
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
          .state('roomKOTH', {
            url: '/room/kingofthehill/:roomId',
            templateUrl: 'js/room/roomKOTH.tpl.html',
            controller: 'roomController',
            resolve: {
              "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireAuth();
              }]
            }
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

    .directive('draggable', function() {
      return {

        restrict:'A',

        link: function(scope, element, attrs) {
          element.draggable({
            drag: function( event, ui ) {
              scope.link.left = ui.position.left;
              scope.link.top = ui.position.top;

              console.log(scope.link.left);
            }
          });
        }
      };
    });

}());
