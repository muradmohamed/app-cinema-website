// console.log('forget.js');

angular.module('CinemaApp').controller('forgetController', ['$scope',
    function($scope) {

        // console.log('Controller Forget');

        $scope.emailRecover = "";

        $scope.clickRecover = function() {
            if ($scope.emailRecover.length === 0) {
                document.getElementById('emailRecover').setCustomValidity('Email là bắt buộc');
                return;
            }
            document.getElementById('emailRecover').setCustomValidity('');
            if (validateEmail($scope.emailRecover) === false) {
                document.getElementById('emailRecover').setCustomValidity('Email không hợp lệ');
                return;
            }
            document.getElementById('emailRecover').setCustomValidity('');
            solveFirebase();
        }

        var solveFirebase = function() {
            firebase.auth().sendPasswordResetEmail($scope.emailRecover)
                .then(function() {
                    alert('Email khôi phục mật khẩu đã được gửi!');
                    window.location.reload();
                }).catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode == 'auth/invalid-email') {
                        alert('Email không hợp lệ');
                    } else if (errorCode == 'auth/user-not-found') {
                        alert('Email này chưa được đăng ký hoặc đã bị xóa');
                    }
                });
        }
    }
]);