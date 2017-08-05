angular.module('CinemaApp', ['firebase']);

angular.module('CinemaApp').controller('mainController', ['$scope', '$firebaseArray', '$firebaseObject', '$firebaseAuth',

    function($scope, $firebaseArray, $firebaseObject, $firebaseAuth) {

        // console.log('Main Controller');

        hideBeforeLoadingComplete();

        var avatarDefault = "/images/avatar-user.png";

        $scope.userLogined = false;
        $scope.currentEmail = '';
        $scope.currentUsername = '';
        $scope.currentUid = '';
        $scope.currentUserAvartar = avatarDefault;
        $scope.completeLoading = false;

        $scope.test = 123;

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // console.log('User logined');
                isUserLogined = true;
                $scope.userLogined = true;
                $scope.currentEmail = user.email;
                $scope.currentUid = user.uid;
                var ref = firebase.database().ref('listUsers/' + $scope.currentUid);
                ref.once('value').then(function(snapshot) {
                    var data = snapshot.val();
                    $scope.currentUsername = data.username;
                    $scope.currentUserAvartar = data.avatar ? data.avatar : avatarDefault;
                    $scope.$apply();
                    showAfterLoadingComplete();
                });
            } else {
                // console.log('User no login');
                isUserLogined = false;
                $scope.userLogined = false;
                $scope.currentEmail = '';
                $scope.currentUsername = '';
                $scope.currentUid = '';
                $scope.currentUserAvartar = avatarDefault;
                // $scope.completeLoading = true;
                // $scope.$apply();
                if (window.location.pathname == "/film/createFilm") {
                    $('#modalWarningCreateFilm').modal('show');
                }
            }
        });

        $scope.clickLogout = function() {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                window.location.reload();
            }).catch(function(error) {
                // An error happened.
                console.log(error);
            });
        }

        $scope.checkPageIndex = function() {
            // console.log(window.location.pathname);
            return window.location.pathname == "/";
        }

        // $scope.resultsSearching = [];

    }
]);