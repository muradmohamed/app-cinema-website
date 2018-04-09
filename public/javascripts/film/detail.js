(() => {
  const showLoader = window.showLoader;
  const showAfterLoadingComplete = window.showAfterLoadingComplete;

  const app = angular.module('CinemaApp');

  app.controller('detailController', ['$scope', '$firebaseArray', '$firebaseObject',
    function ($scope, $firebaseArray, $firebaseObject) {

      $scope.completeLoading = false;
      showLoader();

      var key = document.getElementById('key-film').innerText.trim();

      $scope.name = '';
      $scope.genre = '';
      $scope.time = '';
      $scope.content = '';
      $scope.url = '';

      firebase.database().ref(`/listFilms/${key}`).once('value')
        .then((snapshot) => {
          var film = snapshot.val();
          $scope.name = film.name;
          $scope.genre = film.genre;
          $scope.time = film.time;
          $scope.content = film.content;
          $scope.url = film.url;
          $('.loader').fadeOut(500, () => {
            $scope.completeLoading = true;
            $scope.$apply();
            $('#btnReturn').show();
            showAfterLoadingComplete();
          });
        });
    }
  ]);
})();
