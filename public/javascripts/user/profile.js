// console.log('user/profile.js');

angular.module('CinemaApp').controller("profileUserController", ['$scope', '$firebaseArray', '$firebaseObject',

    function($scope, $firebaseArray, $firebaseObject) {

        // console.log('Controller profile user');

        var uid = '';

        $scope.email = '';
        $scope.username = '';
        $scope.twitter = '';
        $scope.website = '';
        $scope.google = '';
        $scope.facebook = '';
        $scope.skype = '';
        $scope.tel = '';

        $scope.getUser = function() {
            // console.log('getUser()');
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // console.log('logined');
                    uid = user.uid;
                    $scope.email = user.email;
                    var ref = firebase.database().ref('listUsers/' + uid);
                    ref.once('value').then(function(snapshot) {
                        var data = snapshot.val();
                        $scope.username = data.username;
                        $scope.twitter = data.twitter;
                        $scope.website = data.website;
                        $scope.google = data.google;
                        $scope.facebook = data.facebook;
                        $scope.skype = data.skype;
                        $scope.tel = data.tel;
                    });
                }
            });
        }

        $scope.clickSave = function() {
            var userInfo = {
                email: $scope.email,
                username: $scope.username,
                tel: $scope.tel,
                skype: $scope.skype,
                facebook: $scope.facebook,
                google: $scope.google,
                website: $scope.website,
                twitter: $scope.twitter,
            }
            firebase.database().ref('listUsers/' + uid).set(userInfo)
                .then(function() {
                    alert('Thông tin đã được cập nhật');
                    window.location.href = "/";
                });
        }
    }
]);