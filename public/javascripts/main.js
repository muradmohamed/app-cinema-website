(() => {

  const app = angular.module('CinemaApp', ['firebase']);

  app.controller('mainController', ['$scope', '$firebaseArray', '$firebaseObject', '$firebaseAuth',
    function ($scope, $firebaseArray, $firebaseObject, $firebaseAuth) {

      var avatarDefault = '/images/avatar-user.png';

      $scope.userLogined = false;
      $scope.currentEmail = '';
      $scope.currentUsername = '';
      $scope.currentUid = '';
      $scope.currentUserAvartar = avatarDefault;
      $scope.completeLoading = false;

      $scope.test = 123;

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          $scope.userLogined = true;
          $scope.currentEmail = user.email;
          $scope.currentUid = user.uid;
          var ref = firebase.database().ref(`listUsers/${$scope.currentUid}`);
          ref.once('value').then((snapshot) => {
            var data = snapshot.val();
            $scope.currentUsername = data.username;
            $scope.currentUserAvartar = data.avatar ? data.avatar : avatarDefault;
            $scope.$apply();
          });
        } else {
          $scope.userLogined = false;
          $scope.currentEmail = '';
          $scope.currentUsername = '';
          $scope.currentUid = '';
          $scope.currentUserAvartar = avatarDefault;
          if (window.location.pathname == '/film/createFilm') {
            $('#modalWarningCreateFilm').modal('show');
          }
        }
      });

      $scope.clickLogout = function () {
        firebase.auth().signOut().then(() => {
          window.location.reload();
        }).catch((error) => {
          console.log(error);
        });
      };

      $scope.checkPageIndex = function () {
        return window.location.pathname == '/';
      };
    }
  ]);
})();
