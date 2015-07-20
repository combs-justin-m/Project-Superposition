;(function (){

  'use strict';

  angular.module('app')

    .controller('appController', [ '$scope', '$firebaseObject', '$http', 'Auth', 'Home', '$stateParams', '$state',
      function($scope, $firebaseObject, $http, Auth, Home, $stateParams, $state){

        Auth.$onAuth(function(x){
          $scope.authData = x;
        });

        var randomRoomId = Math.round(Math.random() * 100000000);

        $scope.roomNum = randomRoomId;

        var authData = Auth.$getAuth();

        var gitName = function() {
          if (authData === null) {
            return 'Guest';
          } else {
            return authData.github.username;
          }
        }

        $scope.login = function() {
          Auth.$authWithOAuthPopup('github')
            .catch(function(error){
              console.error(error);
          });
          $state.transitionTo($state.current, $stateParams, {
              reload: true,
              inherit: true,
              notify: true
          });
        };

        $scope.logout = function() {
          Auth.$unauth();
          $state.transitionTo($state.current, $stateParams, {
              reload: true,
              inherit: true,
              notify: true
          });
        };

      }])


}());
