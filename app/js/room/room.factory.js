;(function (){

  'use strict';

   angular.module('app')

    .factory("Room", ['$firebaseObject',
      function($firebaseObject) {

        return function(username) {
          // create a reference to the Firebase database where we will store our data
          var randomRoomId = Math.round(Math.random() * 100000000);
          var ref = new Firebase("https://radiant-heat-3085.firebaseio.com/room/" + randomRoomId);
          var roomRef = ref.child(username);

          // return it as a synchronized object
          return $firebaseObject(roomRef);
      };
  }]);

}());