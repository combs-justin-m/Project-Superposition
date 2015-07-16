;(function (){

  'use strict';

  angular.module('app')

    .controller('roomController', [ '$scope', '$firebaseObject', '$http', 'Auth', 'Room', '$stateParams', '$state',
      function($scope, $firebaseObject, $http, Auth, Room, $stateParams, $state){

        Auth.$onAuth(function(x){
          $scope.authData = x;
        });

        $scope.roomName = $stateParams.roomId;

        // SYNC ROOM

        // var ref = new Firebase('radiant-heat-3085.firebaseIO.com');
        //
        // var syncRoom = $firebaseObject(ref);
        //
        // $scope.room = $scope.room || {};

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

      .directive('draggable', function() {

          function link(scope, element, attrs) {

          restrict:'A',


            element.draggable({

              drag: function( event, ui ) {

                scope.room.leftLink = ui.position.left;
                scope.room.topLink = ui.position.top;

              }
            });
          }
        return {
          link: link
        };
      });

}());
