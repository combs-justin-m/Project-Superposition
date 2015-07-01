;(function (){

  'use strict';

  angular.module('app')

    .controller('appController', [ '$scope', '$firebaseObject', '$http', 'Auth',
      function($scope, $firebaseObject, $http, Auth){

        var ref = new Firebase('radiant-heat-3085.firebaseIO.com');

        var syncObject = $firebaseObject(ref);

        $scope.sync = $scope.sync || {};

        syncObject.$bindTo($scope, 'sync').then(function () {

          $scope.embedify = function(link) {

            var youtubeLinkPattern = /^http(s?):\/\/www\.youtu(\.be|be\.com)\/watch\?v=([-_a-zA-z0-9]+)$/;

            var match = youtubeLinkPattern.exec(link);
            if (match) {
              $scope.sync.embedUrl = 'https://www.youtube.com/embed/' + match[3] + '?autoplay=1';
            } else {
              $scope.sync.embedUrl = '';
            }
          };

        });

        Auth.$onAuth(function(authData){
          $scope.authData = authData;
          console.log(authData);
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


      }]);

}());
