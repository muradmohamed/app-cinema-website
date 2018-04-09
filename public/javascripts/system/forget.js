(() => {
  const validateEmail = window.validateEmail;

  angular.module('CinemaApp').controller('forgetController', ['$scope', function ($scope) {

    $scope.emailRecover = '';

    var solveFirebase = function () {
      firebase.auth().sendPasswordResetEmail($scope.emailRecover)
        .then(() => {
          alert('Email khôi phục mật khẩu đã được gửi!');
          window.location.reload();
        }).catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/invalid-email') {
            alert('Email không hợp lệ');
          } else if (errorCode == 'auth/user-not-found') {
            alert('Email này chưa được đăng ký hoặc đã bị xóa');
          }
        });
    };

    $scope.clickRecover = function () {
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
    };
  }
  ]);
})();
