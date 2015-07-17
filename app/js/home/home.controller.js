;(function (){

  'use strict';

  angular.module('app')

    .controller('appController', [ '$scope', '$firebaseObject', '$http', 'Auth', 'Home', '$stateParams', '$state',
      function($scope, $firebaseObject, $http, Auth, Home, $stateParams, $state){

        Auth.$onAuth(function(x){
          $scope.authData = x;
        });

        var randomRoomId = Math.round(Math.random() * 100000000);

        var authData = Auth.$getAuth();

        var gitName = function() {
          if (authData === null) {
            return 'Guest';
          } else {
            return authData.github.username;
          }
        }

        var firepadRef = new Firebase('https://radiant-heat-3085.firebaseio.com/');

        //// Create CodeMirror (with lineWrapping on).
        var codeMirror = CodeMirror(document.getElementById('firepad'), {
          // lineNumbers: true,
          // mode: 'javascript',
          lineWrapping: true
          });

        // Create a random ID to use as our user ID (we must give this to firepad and FirepadUserList).
        var userId = Math.floor(Math.random() * 9999999999).toString();

        //// Create Firepad (with rich text features and our desired userId).
        var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
          richTextToolbar: true,
          richTextShortcuts: true,
          userId: userId
          });

        //// Create FirepadUserList (with our desired userId).
        var firepadUserList = FirepadUserList.fromDiv(firepadRef.child('users'),
            document.getElementById('userlist'), userId
            ,gitName()
            );

        //// Initialize contents.
        firepad.on('ready', function() {
          if (firepad.isHistoryEmpty()) {
            firepad.setText('Check out the user list to the left!');
          }
        });

        Home($stateParams.roomId).$bindTo($scope, 'room').then(function () {

        }); //END BIND

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

        $scope.createRoom = function() {
          $scope.roomNum = randomRoomId;
          console.log($scope.roomNum);
        };

      }])


}());
