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
        $scope.avatar = "/images/avatar-user.png";

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
                        $scope.avatar = data.avatar ? data.avatar : "/images/avatar-user.png";
                    });
                }
            });
        }

        var filePicked = null;

        $scope.clickUploadImage = function() {
            document.getElementById('fileInputAvatar').click();
        }

        document.getElementById('fileInputAvatar').addEventListener('change', function(e) {
            filePicked = e.target.files[0];
            $('#imageAvatar').css('opacity', 1);
        }, false);

        $scope.clickSave = function() {
            if (filePicked !== null) {
                uploadImageAvatar();
            } else updateDataUser();
        }

        function uploadImageAvatar() {
            var time = new Date().getTime();
            var storageRef = firebase.storage().ref('imagesAvatarUser/IMG' + time + '.JPG');
            var metadata = {
                contentType: 'image/JPG'
            };
            storageRef.put(filePicked, metadata)
                .then(function(snapshot) {
                    $scope.avatar = snapshot.downloadURL;
                    updateDataUser();
                })
                .catch(function(error) {
                    alert('Lỗi trong quá trình tải ảnh lên');
                });
        }

        function updateDataUser() {
            var userInfo = {
                email: $scope.email,
                username: $scope.username,
                tel: $scope.tel,
                skype: $scope.skype,
                facebook: $scope.facebook,
                google: $scope.google,
                website: $scope.website,
                twitter: $scope.twitter,
                avatar: $scope.avatar
            }
            firebase.database().ref('listUsers/' + uid).set(userInfo)
                .then(function() {
                    alert('Thông tin đã được cập nhật');
                    window.location.href = "/";
                });
        }
    }
]);


$("#fileInputAvatar").change(function() {
    readURL(this);
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#imageAvatar').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}