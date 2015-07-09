;(function (){

  'use strict';

   angular.module('app')

    .factory("Auth", ['$firebaseAuth',
      function($firebaseAuth) {

      var ref = new Firebase("https://radiant-heat-3085.firebaseio.com");
      return $firebaseAuth(ref);

  }]);

}());
