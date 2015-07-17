;(function (){

  'use strict';

  angular.module('app')

    .controller('roomController', [ '$scope', '$firebaseObject', '$http', 'Auth', 'Room', '$stateParams', '$state',
      function($scope, $firebaseObject, $http, Auth, Room, $stateParams, $state){

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

        console.log(gitName());

        var firepadRef = new Firebase('https://radiant-heat-3085.firebaseio.com/room/' + $stateParams.roomId + "/pad");

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
            document.getElementById('userlist'), userId
            ,gitName()
            );

        //// Initialize contents.
        firepad.on('ready', function() {
          if (firepad.isHistoryEmpty()) {
            firepad.setText('Check out the user list to the left!');
          }
        });

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

        $scope.createRoom = function() {
          var data = Auth.$getAuth();
          $scope.room = Room(data.github.username);
        };


        firepad.registerEntity('a', { attrs: { HREF: 'h', INNER_HTML: 'i' },
          render: function (info) {
            var attrs = this.attrs;
            var href = info && info[attrs.HREF] || '';
            var innerHTML = info && info[attrs.INNER_HTML] || '';
            var link = document.createElement('a');
                link.setAttribute('href', href);
                link.innerHTML = innerHTML;
                return link;
                },
          fromElement: function (element) {
            var attrs = this.attrs;
            var info = {};
            info[attrs.HREF] = element.hasAttribute('href') ? element.getAttribute('href') : '';
            info[attrs.INNER_HTML] = element.innerHTML || ''; return info; }
          });

        firepad.registerEntity('iframe', {
          render: function(info) {
            var attrs = ['src', 'alt', 'width', 'height', 'style', 'class'];
            var html = '<iframe ';
            for(var i = 0; i < attrs.length; i++) {
              var attr = attrs[i];
              if (attr in info) {
                html += ' ' + attr + '="' + info[attr] + '"';
              }
            }
            html += "></iframe>";
            return html;
          },
          fromElement: function(element) {
            var info = {};
            for(var i = 0; i < attrs.length; i++) {
              var attr = attrs[i];
              if (element.hasAttribute(attr)) {
                info[attr] = element.getAttribute(attr);
              }
            }
            return info;
          }
        });

        $scope.addFrame = function() {
          firepad.insertEntity('iframe', { src: 'https://www.youtube.com/embed/Ge5giteZxto?autoplay=1', width: 400, height: 400 })
          console.log('add frame');
        };



      }])

}());
