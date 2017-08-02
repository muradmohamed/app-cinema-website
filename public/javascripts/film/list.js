// console.log('film/list.js');

angular.module('CinemaApp').controller("listFilmController", ['$scope', '$firebaseArray', '$firebaseObject',

    function($scope, $firebaseArray, $firebaseObject) {

        // console.log('Controller List Film');

        var ref = firebase.database().ref('listFilms');
        $scope.listFilm = $firebaseArray(ref);

        $scope.minContentFilm = function(film) {
            var len = film.content.length > 150 ? 150 : film.content.length;
            return film.content.substr(0, len) + '...';
        }

        $scope.listFilm.$loaded().then(function(val) {
            // console.log(val);
        }).catch(function(error) {
            console.log(error);
        });

        $scope.viewFilm = function(film) {
            // console.log(film.key);
            window.location.href = "/film/detail/" + film.key;
        }
    }
]);