;(function (){

  'use strict';

  angular.module('app')

    .controller('roomJSController', [ '$scope', '$firebaseObject', '$http', 'Auth', 'Room', '$stateParams', '$state', '$mdToast',
      function($scope, $firebaseObject, $http, Auth, Room, $stateParams, $state, $mdToast){

        $scope.href = window.location.href;

        var cutTextareaBtn = document.querySelector('.js-textareacutbtn');

        cutTextareaBtn.addEventListener('click', function(event) {
          var cutTextarea = document.querySelector('.js-cuttextarea');
          console.log(cutTextarea);
          cutTextarea.select();

          try {
            var successful = document.execCommand('copy');
          } catch(err) {
            console.log('Oops, unable to cut');
          }
        });

        $scope.toastPosition = {
          bottom: false,
          top: true,
          left: false,
          right: true
        };

        $scope.getToastPosition = function() {
          return Object.keys($scope.toastPosition)
            .filter(function(pos) { return $scope.toastPosition[pos]; })
            .join(' ');
        };

        $scope.showCopy = function() {
          $mdToast.show(
            $mdToast.simple()
              .content('Copied to clipboard!')
              .position($scope.getToastPosition())
              .hideDelay(3000)
          );
        };

        Auth.$onAuth(function(x){
          $scope.authData = x;
        });

        $scope.roomName = $stateParams.roomId;

        var authData = Auth.$getAuth();

        var gitName = function() {
          if (authData === null) {
            return 'Guest';
          } else {
            return authData.github.username;
          }
        }

        var firepadRef = new Firebase('https://radiant-heat-3085.firebaseio.com/room/' + $stateParams.roomId + "/pad");

        //// Create CodeMirror (with lineWrapping on).
        var codeMirror = CodeMirror(document.getElementById('firepad'), {
          mode: 'javascript',
          lineNumbers: true,
          lineWrapping: true
          });

        // Create a random ID to use as our user ID (we must give this to firepad and FirepadUserList).
        var userId = Math.floor(Math.random() * 9999999999).toString();

        //// Create Firepad (with rich text features and our desired userId).
        var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
          richTextToolbar: true,
          richTextShortcuts: false,
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
            firepad.setText('//Collaborate, edit and problem solve all the JavaScripts');
          }
        });

        Auth.$onAuth(function(x){
          $scope.authData = x;
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

      }])

}());
