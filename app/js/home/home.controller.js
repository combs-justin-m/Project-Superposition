;(function (){

  'use strict';

  angular.module('app')

    .controller('appController', [ '$scope', '$firebaseObject', '$http', 'Auth', 'Room', '$stateParams', '$state',
      function($scope, $firebaseObject, $http, Auth, Room, $stateParams, $state){

        // // ROOM SYNC

        // var ref = new Firebase('radiant-heat-3085.firebaseIO.com');

        // var syncObject = $firebaseObject(ref);

        // $scope.sync = $scope.sync || {};

        // syncObject.$bindTo($scope, 'sync').then(function () {

        //   $scope.embedify = function(link) {

        //     var youtubeLinkPattern = /^http(s?):\/\/www\.youtu(\.be|be\.com)\/watch\?v=([-_a-zA-z0-9]+)$/;

        //     var match = youtubeLinkPattern.exec(link);
        //     if (match) {
        //       $scope.sync.embedYT = 'https://www.youtube.com/embed/' + match[3] + '?autoplay=1';
        //     } else {
        //       $scope.sync.embedYT = '';
        //     }
        //   };

        //   $scope.spotify = function(link) {

        //     $scope.sync.embedSpot = 'https://embed.spotify.com/?uri=' + link;
        //   };

        //   $scope.soundcloud = function(link) {

        //     SC.oEmbed($scope.sync.input.cloud,

        //     {auto_play: true},  document.getElementById("SoundCloud"));

        //     $scope.sync.embedCloud = link;
        //   };

        // });

        // Login OAuth

        Auth.$onAuth(function(x){
          $scope.authData = x;
          // console.log($scope.authData.github);
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

          $scope.room.$save().then(function() {



          }).catch(function(error){
            console.log(error);
          });
        };

      }]);

}());
