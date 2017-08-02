// console.log('changePassword.js');

angular.module('CinemaApp').controller("changePasswordController", ['$scope', '$firebaseArray', '$firebaseObject', '$firebaseAuth',

    function($scope, $firebaseArray, $firebaseObject, $firebaseAuth) {

        // console.log('changePassword Controller');

        $scope.passwordCurrent = '';
        $scope.passwordNew = '';
        $scope.passwordNewConfirm = '';

        $scope.clickChangePassword = function() {
            if ($scope.passwordCurrent.length === 0) {
                document.getElementById('passwordCurrent').setCustomValidity('Mật khẩu là yêu cầu');
                return;
            }
            document.getElementById('passwordCurrent').setCustomValidity('');
            if ($scope.passwordNew.length < 7) {
                document.getElementById('passwordNew').setCustomValidity('Mật khẩu tối thiểu 7 ký tự');
                return;
            }
            document.getElementById('passwordNew').setCustomValidity('');
            if ($scope.passwordNew !== $scope.passwordNewConfirm) {
                document.getElementById('passwordNewConfirm').setCustomValidity('Mật khẩu không khớp');
                return;
            }
            document.getElementById('passwordNewConfirm').setCustomValidity('');

            solveFirebase();
        }

        var solveFirebase = function() {
            var user = firebase.auth().currentUser;

            var credential = firebase.auth.EmailAuthProvider.credential(
                user.email,
                $scope.passwordCurrent
            );

            user.reauthenticateWithCredential(credential).then(function() {
                // User re-authenticated.
                // console.log('auth ok');
                updatePassword();
            }).catch(function(error) {
                // An error happened.
                // console.log(error);
                alert('Mật khẩu không đúng hoặc người dùng chưa có mật khẩu xác thực!');
            });
        }

        var updatePassword = function() {
            firebase.auth().currentUser.updatePassword($scope.passwordNew).then(function() {
                // Update successful.
                alert('Mật khẩu thay đổi thành công!');
                window.location.reload();
            }).catch(function(error) {
                // An error happened.
                // console.log('Loi cap nhat' + error);
                alert('Mật khẩu không thay đổi! Vui lòng thử lại!')
            });
        }
    }
]);