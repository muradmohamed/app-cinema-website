(() => {

  const showLoader = window.showLoader;
  const showAfterLoadingComplete = window.showAfterLoadingComplete;

  angular.module('CinemaApp').controller('profileUserController', ['$scope', '$firebaseArray', '$firebaseObject',
    function ($scope, $firebaseArray, $firebaseObject) {

      $scope.completeLoading = false;
      showLoader();

      var uid = '';
      var avatarDefault = '/images/avatar-user.png';
      $scope.email = '';
      $scope.username = '';
      $scope.twitter = '';
      $scope.website = '';
      $scope.google = '';
      $scope.facebook = '';
      $scope.skype = '';
      $scope.tel = '';
      $scope.avatar = avatarDefault;

      $scope.getUser = function () {
        // console.log('getUser()');
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // console.log('logined');
            uid = user.uid;
            $scope.email = user.email;
            var ref = firebase.database().ref(`listUsers/${uid}`);
            ref.once('value').then((snapshot) => {
              var data = snapshot.val();
              $scope.username = data.username;
              $scope.twitter = data.twitter;
              $scope.website = data.website;
              $scope.google = data.google;
              $scope.facebook = data.facebook;
              $scope.skype = data.skype;
              $scope.tel = data.tel;
              $scope.avatar = data.avatar ? data.avatar : avatarDefault;
              $('.loader').fadeOut(500, () => {
                $scope.completeLoading = true;
                $scope.$apply();
                showAfterLoadingComplete();
              });
            });
          }
        });
      };

      var filePicked = null;

      $scope.clickUploadImage = function () {
        document.getElementById('fileInputAvatar').click();
      };

      document.getElementById('fileInputAvatar').addEventListener('change', (e) => {
        filePicked = e.target.files[0];
        $('#imageAvatar').css('opacity', 1);
      }, false);

      $scope.clickSave = function () {
        showLoader();
        if (filePicked != null) {
          uploadImageAvatar();
        } else updateDataUser();
      };

      function uploadImageAvatar() {
        var time = new Date().getTime();
        var storageRef = firebase.storage().ref(`imagesAvatarUser/IMG${time}.JPG`);
        var metadata = {
          contentType: 'image/JPG'
        };
        storageRef.put(filePicked, metadata)
          .then((snapshot) => {
            $scope.avatar = snapshot.downloadURL;
            updateDataUser();
          })
          .catch((error) => {
            console.log(error);
            $('.loader').fadeOut(500, () => {
              alert('Lỗi trong quá trình tải ảnh lên');
            });
          });
      }

      function updateDataUser() {
        var userInfo = {
          email: $scope.email,
          username: $scope.username,
          tel: $scope.tel ? $scope.tel : null,
          skype: $scope.skype ? $scope.skype : null,
          facebook: $scope.facebook ? $scope.facebook : null,
          google: $scope.google ? $scope.google : null,
          website: $scope.website ? $scope.website : null,
          twitter: $scope.twitter ? $scope.twitter : null,
          avatar: $scope.avatar ? $scope.avatar : null
        };

        firebase.database().ref(`listUsers/${uid}`).update(userInfo)
          .then(() => {
            $('.loader').fadeOut(500, () => {
              alert('Thông tin đã được cập nhật');
              window.location.href = '/';
            });
          });
      }
    }
  ]);

})();

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#imageAvatar').attr('src', e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}
