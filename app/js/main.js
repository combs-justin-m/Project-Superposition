;(function (){

  'use strict';

  angular.module('app', ['firebase'])

    .config(function($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
    $sceProvider.enabled(false);
  });


}());