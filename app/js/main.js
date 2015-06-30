;(function (){

  'use strict';

  angular.module('app', ['firebase', 'ui.router'])

    .config(['$sceProvider', '$stateProvider',
      function($sceProvider, $stateProvider) {

        $stateProvider
          .state('app', {
            url: '',
            templateUrl: 'js/home/home.tpl.html',
            controller: 'appController'
          });
          // .state('login', {
          //   url: '/login',
          //   templateUrl: 'js/login/login.tpl.html',
          //   controller: 'loginController'
          // });

        // Completely disable SCE.  For demonstration purposes only!
        // Do not use in production.
        $sceProvider.enabled(false);

    }
  ]);


}());