(() => {

  angular.module('CinemaApp').controller('changePasswordController', ['$scope', '$firebaseArray', '$firebaseObject', '$firebaseAuth',
    function ($scope, $firebaseArray, $firebaseObject, $firebaseAuth) {

      $scope.passwordCurrent = '';
      $scope.passwordNew = '';
      $scope.passwordNewConfirm = '';


      var updatePassword = function () {
        firebase.auth().currentUser.updatePassword($scope.passwordNew).then(() => {
          alert('Mật khẩu thay đổi thành công!');
          window.location.reload();
        }).catch((error) => {
          alert('Mật khẩu không thay đổi! Vui lòng thử lại!');
        });
      };

      var solveFirebase = function () {
        var user = firebase.auth().currentUser;

        var credential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          $scope.passwordCurrent
        );

        user.reauthenticateWithCredential(credential).then(() => {
          // User re-authenticated.
          updatePassword();
        }).catch((error) => {
          console.log(error);
          alert('Mật khẩu không đúng hoặc người dùng chưa có mật khẩu xác thực!');
        });
      };

      $scope.clickChangePassword = function () {
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
      };
    }
  ]);

})();
