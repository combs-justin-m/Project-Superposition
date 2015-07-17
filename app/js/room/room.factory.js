;(function (){

  'use strict';

   angular.module('app')

    .factory("Home", ['$firebaseObject',
      function($firebaseObject) {

        return function() {
          // var randomRoomId = Math.round(Math.random() * 100000000);
          var ref = new Firebase("https://radiant-heat-3085.firebaseio.com/");
          // var roomRef = ref.child();

          return $firebaseObject(ref);
      };
    }])
    .factory("Room", ['$firebaseObject',
      function($firebaseObject) {

        return function(param) {
          // var randomRoomId = Math.round(Math.random() * 100000000);
          var ref = new Firebase("https://radiant-heat-3085.firebaseio.com/room/" + param);
          // var roomRef = ref.child();

          return $firebaseObject(ref);
      };
    }])
    .factory("roomWB", ["$firebaseArray",
      function($firebaseArray) {

          return function(username) {
          // create a reference to the database where we will store our data
          // var randomRoomId = Math.round(Math.random() * 100000000);
          var ref = new Firebase("https://radiant-heat-3085.firebaseio.com/roomWB/");
          var roomRef = ref.child(username);

          return $firebaseArray(roomRef);
      }
    }]);


}());
