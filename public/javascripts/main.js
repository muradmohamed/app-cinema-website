angular.module('CinemaApp', ['firebase']);

angular.module('CinemaApp').controller('mainController', ['$scope', '$firebaseArray', '$firebaseObject', '$firebaseAuth',

    function($scope, $firebaseArray, $firebaseObject, $firebaseAuth) {

        // console.log('Main Controller');

        $scope.userLogined = false;
        $scope.currentEmail = '';
        $scope.currentUsername = '';
        $scope.currentUid = '';
        // console.log("main");

        // var initApp = function() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                // console.log('logined');
                $scope.userLogined = true;
                $scope.currentEmail = user.email;
                $scope.currentUid = user.uid;
                var ref = firebase.database().ref('listUsers/' + $scope.currentUid);
                ref.once('value').then(function(snapshot) {
                    $scope.currentUsername = snapshot.val().username;
                    $scope.$apply();
                    $('body').toggleClass('loaded');
                });
            } else {
                // No user is signed in.
                // console.log('no login');
                $scope.userLogined = false;
                $scope.currentEmail = '';
                $scope.currentUsername = '';
                $scope.currentUid = '';
            }
            // console.log($scope.userLogined);
        });
        // }

        $scope.clickLogout = function() {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                window.location.reload();
            }).catch(function(error) {
                // An error happened.
                console.log(error);
            });
        }

        // initApp();
    }
]);

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}