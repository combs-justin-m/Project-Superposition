;(function (){

  'use strict';

  angular.module('app')

    .controller('myApp', [ '$scope', '$firebaseObject',
      function($scope, $firebaseObject){

        var ref = new Firebase('radiant-heat-3085.firebaseIO.com');

        var syncObject = $firebaseObject(ref);

        // synchronize the object with a three-way data binding
        // click on `index.html` above to see it used in the DOM!

        $scope.sync = $scope.sync || {};

        syncObject.$bindTo($scope, "sync").then(function () {

          $scope.embedify = function(link) {

            var youtubeLinkPattern = /^http(s?):\/\/www\.youtu(\.be|be\.com)\/watch\?v=([-_a-zA-z0-9]+)$/;

            var match = youtubeLinkPattern.exec(link);
            if (match) {
              $scope.sync.embedUrl = "https://www.youtube.com/embed/" + match[3] + "?autoplay=1";
            } else {
              $scope.sync.embedUrl = "";
            }
          }

        });

      }]);

}());
