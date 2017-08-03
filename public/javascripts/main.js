angular.module('CinemaApp', ['firebase']);

angular.module('CinemaApp').controller('mainController', ['$scope', '$firebaseArray', '$firebaseObject', '$firebaseAuth',

    function($scope, $firebaseArray, $firebaseObject, $firebaseAuth) {

        // console.log('Main Controller');

        hideBeforeLoadingComplete();

        $scope.userLogined = false;
        $scope.currentEmail = '';
        $scope.currentUsername = '';
        $scope.currentUid = '';
        $scope.completeLoading = false;


        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // console.log('User logined');
                $scope.userLogined = true;
                $scope.currentEmail = user.email;
                $scope.currentUid = user.uid;
                var ref = firebase.database().ref('listUsers/' + $scope.currentUid);
                ref.once('value').then(function(snapshot) {
                    $scope.currentUsername = snapshot.val().username;
                    $scope.$apply();
                    showAfterLoadingComplete();
                });
            } else {
                // console.log('User no login');
                $scope.userLogined = false;
                $scope.currentEmail = '';
                $scope.currentUsername = '';
                $scope.currentUid = '';
                // $scope.completeLoading = true;
                // $scope.$apply();
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
    }
]);