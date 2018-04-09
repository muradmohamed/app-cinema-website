(() => {
  const validateEmail = window.validateEmail;

  var lastUserEmail = null;
  var lastUserPassword = null;
  var lastUserRemember = false;

  const app = angular.module('CinemaApp');

  app.controller('loginController', ['$scope', '$firebaseArray', '$firebaseObject', '$firebaseAuth',
    function ($scope, $firebaseArray, $firebaseObject, $firebaseAuth) {

      $scope.emailLogin = '';
      $scope.passwordLogin = '';
      $scope.rememberPassword = false;

      if (lastUserRemember) {
        $scope.emailLogin = lastUserEmail;
        $scope.passwordLogin = lastUserPassword;
      }

      var solveFirebase = function () {
        firebase.auth().signInWithEmailAndPassword($scope.emailLogin, $scope.passwordLogin)
          .then(() => {
            // console.log($scope.rememberPassword);
            if ($scope.rememberPassword) {
              lastUserEmail = $scope.emailLogin;
              lastUserPassword = $scope.passwordLogin;
            }
            lastUserRemember = $scope.rememberPassword;
            window.location.reload(true);
          }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
              alert('Sai mật khẩu');
            } else {
              alert('Email này chưa được đăng ký hoặc đã bị xóa');
            }
          });
      };

      $scope.clickLogin = function () {
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
      };

    }
  ]);
})();
