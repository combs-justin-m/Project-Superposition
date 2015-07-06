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
          .state('room', {
            url: '/room/:roomId',
            templateUrl: 'js/room/room.tpl.html',
            controller: 'roomController'
          });

        // Completely disable SCE.  For demonstration purposes only!
        // Do not use in production.
        $sceProvider.enabled(false);

    }
  ]);


}());