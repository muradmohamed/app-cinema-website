// console.log('login.js');

angular.module('CinemaApp').controller('loginController', ['$scope', '$firebaseArray', '$firebaseObject', '$firebaseAuth',
    function($scope, $firebaseArray, $firebaseObject, $firebaseAuth) {

        // console.log('Controller Login');

        $scope.emailLogin = "";
        $scope.passwordLogin = "";
        $scope.rememberPassword = false;

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