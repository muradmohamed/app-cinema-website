// console.log('login.js');

var lastUserEmail = null;
var lastUserPassword = null;
var lastUserRemember = false;

angular.module('CinemaApp').controller('loginController', ['$scope', '$firebaseArray', '$firebaseObject', '$firebaseAuth',
    function($scope, $firebaseArray, $firebaseObject, $firebaseAuth) {

        // console.log('Controller Login');

        $scope.emailLogin = "";
        $scope.passwordLogin = "";
        $scope.rememberPassword = false;

        console.log(lastUserRemember);
        if (lastUserRemember) {
            $scope.emailLogin = lastUserEmail;
            $scope.passwordLogin = lastUserPassword;
        }

        $scope.clickLogin = function() {
            if ($scope.emailLogin.length === 0) {
                document.getElementById('emailLogin').setCustomValidity('Email là bắt buộc');
                return;
            }
            document.getElementById('emailLogin').setCustomValidity('');
            if (validateEmail($scope.emailLogin) === false) {
                document.getElementById('emailLogin').setCustomValidity('Email không hợp lệ');
                return;
            }
            document.getElementById('emailLogin').setCustomValidity('');
            if ($scope.passwordLogin.length === 0) {
                document.getElementById('passwordLogin').setCustomValidity('Mật khẩu là yêu cầu');
                return;
            }
            document.getElementById('passwordLogin').setCustomValidity('');
            solveFirebase();
        }

        solveFirebase = function() {
            firebase.auth().signInWithEmailAndPassword($scope.emailLogin, $scope.passwordLogin)
                .then(function() {
                    // console.log($scope.rememberPassword);
                    if ($scope.rememberPassword) {
                        lastUserEmail = $scope.emailLogin;
                        lastUserPassword = $scope.passwordLogin;
                    }
                    lastUserRemember = $scope.rememberPassword;
                    window.location.reload(true);
                }).catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        alert('Sai mật khẩu');
                    } else {
                        alert('Email này chưa được đăng ký hoặc đã bị xóa');
                    }
                });
        }
    }
]);