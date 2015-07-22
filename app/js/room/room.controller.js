;(function (){

  'use strict';

  angular.module('app')

    .controller('roomController', [ '$scope', '$firebaseObject', '$http', 'Auth', 'Room', '$stateParams', '$state', '$mdToast',
      function($scope, $firebaseObject, $http, Auth, Room, $stateParams, $state, $mdToast){

        $scope.href = window.location.href;
        $scope.roomNum = $stateParams.roomId;

        var cutTextareaBtn = document.querySelector('.js-textareacutbtn');

        cutTextareaBtn.addEventListener('click', function(event) {
          var cutTextarea = document.querySelector('.js-cuttextarea');
          cutTextarea.select();

          try {
            var successful = document.execCommand('copy');
          } catch(err) {
            console.log('Oops, unable to cut');
          }
        });

        $scope.toastPosition = {
          bottom: false,
          top: true,
          left: false,
          right: true
        };

        $scope.getToastPosition = function() {
          return Object.keys($scope.toastPosition)
            .filter(function(pos) { return $scope.toastPosition[pos]; })
            .join(' ');
        };


        $scope.showCopy = function() {
          $mdToast.show(
            $mdToast.simple()
              .content('Copied to clipboard!')
              .position($scope.getToastPosition())
              .hideDelay(3000)
          );
        };

        Auth.$onAuth(function(x){
          $scope.authData = x;
        });

        var authData = Auth.$getAuth();

        var gitName = function() {
          if (authData === null) {
            return 'Guest';
          } else {
            return authData.github.username;
          }
        }

        var firepadRef = new Firebase('https://radiant-heat-3085.firebaseio.com/room/' + $stateParams.roomId + "/pad");

        //// Create CodeMirror (with lineWrapping on).
        var codeMirror = CodeMirror(document.getElementById('firepad'), {
          mode: '',
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
            firepad.setText('Copy room URL, share with friends directly, or Tweet for everyone to join in.');
          }
        });

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


        firepad.registerEntity('a', { attrs: { HREF: 'h', INNER_HTML: 'i'},
          render: function (info) {
            var attrs = this.attrs;
            var href = info && info[attrs.HREF] || '';
            var innerHTML = info && info[attrs.INNER_HTML] || '';
            var link = document.createElement('a');
                link.setAttribute('href', href);
                link.setAttribute('target', '_blank');
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
            var attrs = ['src', 'alt', 'width', 'height', 'style', 'class', 'frameborder'];
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

        $scope.addLink = function(url) {
          firepad.insertEntity('a', { h: url, i: url})

          $scope.link = '';
          $scope.showLink = false;
        };

        $scope.addImg = function(url) {
          firepad.insertEntity('img', { src: url, frameborder:0 })

          $scope.img = '';
          $scope.showImg = false;
        };

        $scope.addYoutube = function(link) {

          var youtubeLinkPattern = /^http(s?):\/\/www\.youtu(\.be|be\.com)\/watch\?v=([-_a-zA-z0-9]+)$/;

          var match = youtubeLinkPattern.exec(link);
          if (match) {
            $scope.linkYT = 'https://www.youtube.com/embed/' + match[3] + '?autoplay=1';
          } else {
            $scope.linkYT = '';
          }

          firepad.insertEntity('iframe', { src: $scope.linkYT, height: 400, width: 1000})

          $scope.YT = '';
          $scope.showYT = false;
        };

        $scope.addSpotify = function(link) {

          firepad.insertEntity('iframe', { src: 'https://embed.spotify.com/?uri=' + link, width: 318, height: 400, frameborder:0 })

          $scope.spot = '';
          $scope.showSpot = false;
        };

      }])

}());
