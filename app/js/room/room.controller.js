;(function (){

  'use strict';

  angular.module('app')

    .controller('roomController', [ '$scope', '$firebaseObject', '$http', 'Auth', 'Room', '$stateParams', '$state',
      function($scope, $firebaseObject, $http, Auth, Room, $stateParams, $state){


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
            document.getElementById('userlist'), userId);

        //// Initialize contents.
        firepad.on('ready', function() {
          if (firepad.isHistoryEmpty()) {
            firepad.setText('Check out the user list to the left!');
          }
        });


        Auth.$onAuth(function(x){
          $scope.authData = x;
        });

        $scope.roomName = $stateParams.roomId;

        Room($stateParams.roomId).$bindTo($scope, 'room').then(function () {

          $scope.embedify = function(link) {

            var youtubeLinkPattern = /^http(s?):\/\/www\.youtu(\.be|be\.com)\/watch\?v=([-_a-zA-z0-9]+)$/;

            var match = youtubeLinkPattern.exec(link);
            if (match) {
              $scope.room.embedYT = 'https://www.youtube.com/embed/' + match[3] + '?autoplay=1';
            } else {
              $scope.room.embedYT = '';
            }
          };

          $scope.spotify = function(link) {

            $scope.room.embedSpot = 'https://embed.spotify.com/?uri=' + link;
          };

          $scope.soundcloud = function(link) {

            SC.oEmbed($scope.room.input.cloud,

            {auto_play: true},  document.getElementById("SoundCloud"));

            $scope.room.embedCloud = link;
          };

          $scope.goHome = function() {
            $state.go('app');
          };

          $scope.logout = function() {
            Auth.$unauth();
            $state.go('app');
          };

        }); //END BIND


      }])


}());
