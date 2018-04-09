(() => {
  const showLoader = window.showLoader;
  const showAfterLoadingComplete = window.showAfterLoadingComplete;
  const viToAlias = window.viToAlias;

  const app = angular.module('CinemaApp');

  app.controller('listFilmController', ['$scope', '$firebaseArray', '$firebaseObject',
    function ($scope, $firebaseArray, $firebaseObject) {
      $scope.completeLoading = false;
      showLoader();

      var ref = firebase.database().ref('listFilms');
      $scope.listFilm = $firebaseArray(ref);

      $scope.minContentFilm = function (film) {
        var len = film.content.length > 150 ? 150 : film.content.length;
        return `${film.content.substr(0, len)}...`;
      };

      $scope.listFilm.$loaded().then((val) => {
        $scope.listFilm.forEach((film) => {
          film.contentSearch = viToAlias(film.name);
          film.contentSearch += viToAlias(film.content);
          film.contentSearch += viToAlias(film.genre);
        });

        $('.loader').fadeOut(500, () => {
          $scope.completeLoading = true;
          $scope.$apply();
          showAfterLoadingComplete();
        });
      }).catch((error) => {
        console.log(error);
      });

      $scope.urlFilm = function (film) {
        return `${window.location.href}film/detail/${film.key}`;
      };

      $scope.comparatorFilm = function (film) {
        var year = parseInt(film.year, 10);
        var month = parseInt(film.month, 10);
        return -(year * 100 + month);
      };
    }
  ]);
})();
