;(function (){

  'use strict';

  angular.module('app')

    .controller('appController', [ '$scope', '$firebaseObject', 'Auth', 'Room', '$state',
      function($scope, $firebaseObject, Auth, Room, $state){


        // Login OAuth

        Auth.$onAuth(function(x){
          $scope.authData = x;
          console.log(x);
        });

        $scope.login = function() {
          Auth.$authWithOAuthPopup('github')
            .catch(function(error){
              console.error(error);
          });

        };

        $scope.logout = function() {
          Auth.$unauth();
        };

        $scope.createRoom = function() {

          var data = Auth.$getAuth();
          $scope.room = Room(data.github.username);

          console.log($scope.room.$id);

          // var userRoom = $scope.room.$id;
          // $stateParams.roomId = userRoom;

          // $state.go('room')

          // $scope.room.$save().then(function() {

          //   $state.go('room');

          // }).catch(function(error){
          //   console.log(error);
          // });
        };

      }]);

}());
