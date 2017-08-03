// console.log('detail.js');

angular.module('CinemaApp').controller("detailController", ['$scope', '$firebaseArray', '$firebaseObject',

    function($scope, $firebaseArray, $firebaseObject) {

        // console.log('detail controller');

        hideBeforeLoadingComplete();

        var key = document.getElementById('key-film').innerText;
        // console.log(key);

        $scope.name = "";
        $scope.genre = "";
        $scope.time = "";
        $scope.content = "";
        $scope.url = "";
        $scope.noi_dung_mo_ta = "";

        $scope.complete = false;

        firebase.database().ref('/listFilms/' + key).once('value')
            .then(function(snapshot) {
                console.log(snapshot.val());
                var film = snapshot.val();
                $scope.name = film.name;
                $scope.genre = "Thể loại: " + film.genre;
                $scope.time = "Thời điểm phát hành: " + film.time;
                $scope.noi_dung_mo_ta = "Nội dung mô tả: ";
                $scope.content = film.content;
                $scope.url = film.url;
                $scope.complete = true;
                $scope.$apply();
                $('#btnReturn').show();
                showAfterLoadingComplete();
            });
    }
]);