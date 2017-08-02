angular.module('CinemaApp', ['firebase']);

angular.module('CinemaApp').controller('mainController', ['$scope', '$firebaseArray', '$firebaseObject', '$firebaseAuth',

    function($scope, $firebaseArray, $firebaseObject, $firebaseAuth) {

        // console.log('Main Controller');

        $scope.userLogined = false;
        $scope.currentEmail = '';
        $scope.currentUsername = '';
        $scope.currentUid = '';
        $scope.completeLoading = false;

        // $('#login-complete').html('true');
        // $('#login-complete').text();

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // console.log('User logined');
                $scope.userLogined = true;
                $scope.currentEmail = user.email;
                $scope.currentUid = user.uid;
                var ref = firebase.database().ref('listUsers/' + $scope.currentUid);
                ref.once('value').then(function(snapshot) {
                    $scope.currentUsername = snapshot.val().username;
                    $scope.completeLoading = true;
                    $scope.$apply();
                    $('#login-complete').html('true');
                });
            } else {
                // console.log('User no login');
                $scope.userLogined = false;
                $scope.currentEmail = '';
                $scope.currentUsername = '';
                $scope.currentUid = '';
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