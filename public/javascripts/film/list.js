// console.log('film/list.js');

angular.module('CinemaApp').controller("listFilmController", ['$scope', '$firebaseArray', '$firebaseObject',

    function($scope, $firebaseArray, $firebaseObject) {

        // console.log('Controller List Film');
        $scope.completeLoading = false;
        showLoader();

        var ref = firebase.database().ref('listFilms');
        $scope.listFilm = $firebaseArray(ref);

        $scope.minContentFilm = function(film) {
            var len = film.content.length > 150 ? 150 : film.content.length;
            return film.content.substr(0, len) + '...';
        }

        $scope.listFilm.$loaded().then(function(val) {
            // console.log(val);
            
            $scope.listFilm.forEach(function(film) {
                film.contentSearch = viToAlias(film.name);
                film.contentSearch += viToAlias(film.content);
                film.contentSearch += viToAlias(film.genre);
                // console.log(film.contentSearch);
            });

            $('.loader').fadeOut(500, function() {
                $scope.completeLoading = true;
                $scope.$apply();
                showAfterLoadingComplete();
            })
        }).catch(function(error) {
            // console.log(error);
        });

        $scope.urlFilm = function(film) {
            return window.location.href + "film/detail/" + film.key;
        }

        $scope.comparatorFilm = function(film) {
            var year = parseInt(film.year);
            var month = parseInt(film.month);
            return -(year * 100 + month);
            // sort decressing time
        }
    }
]);