// console.log('creat.js film');

angular.module('CinemaApp').controller('createController', ['$scope', '$firebaseArray', '$firebaseObject', '$firebaseAuth',
    function($scope, $firebaseArray, $firebaseObject, $firebaseAuth) {

        // console.log('Controller Create Film');

        hideBeforeLoadingComplete();

        $scope.listGenreFilms = [
            'Tiểu sử lịch sử',
            'Lãng mạn tình cảm',
            'Khoa học viễn tưởng',
            'Huyền bí huyền ảo',
            'Phiêu lưu mạo hiểm',
            'Pháp luật hình sự',
            'Chiến tranh cổ trang',
            'Chiến tranh trung đại',
            'Chiến tranh hiện đại',
            'Kiếm hiệp, cổ trang',
            'Thuyết minh',
            'Hoạt hình',
            'Ma, kinh dị',
            'Kịch tính',
            'Hành động',
            'Sát nhân',
            'Thể thao',
            'Võ thuật',
            'Tâm lý',
            'Tội ác',
        ];

        $scope.listMonth = [];
        for (var i = 1; i <= 12; i++) $scope.listMonth.push('Tháng ' + i);
        $scope.listYear = [];
        for (var i = 1900; i <= 2050; i++) $scope.listYear.push('Năm ' + i);

        $scope.filmMonth = 'Tháng ' + (new Date().getMonth() + 1);
        $scope.filmYear = 'Năm ' + new Date().getFullYear();

        console.log($scope.filmMonth, $scope.filmYear);

        // var month = $scope.filmMonth.substr(6, $scope.filmMonth.length - 6);
        // if (month.length == 1) month = '0' + month;
        // console.log('_' + month + '_');

        $scope.filmName = "";
        $scope.filmGenre = $scope.listGenreFilms[0];
        $scope.filmContent = "";
        var filmUrl = "";
        var filePicked = null;

        showAfterLoadingComplete();

        document.getElementById('fileInput').addEventListener('change', function(e) {
            filePicked = e.target.files[0];
            // console.log('change image');
            $('#imageFilm').css('opacity', 1);
        }, false);

        $scope.clickUploadImage = function() {
            document.getElementById('fileInput').click();
        }

        $scope.clickUploadFilm = function() {
            solveFirebase();
            if ($scope.filmName.length < 5 || $scope.filmName.length > 50) {
                document.getElementById('filmName').setCustomValidity('Tên bộ phim từ 5-50 ký tự');
                return;
            }
            document.getElementById('filmName').setCustomValidity('');
            if ($scope.filmContent.length < 10) {
                document.getElementById('filmContent').setCustomValidity('Mô tả bộ phim tối thiểu 10 ký tự');
                return;
            }
            document.getElementById('filmContent').setCustomValidity('');

            if (filePicked === null) {
                alert('Bạn chưa chọn ảnh minh họa phim');
                return;
            }
        }

        function solveFirebase() {
            var time = new Date().getTime();
            var storageRef = firebase.storage().ref('imagess/IMG' + time + '.JPG');
            var metadata = {
                contentType: 'image/JPG'
            };
            storageRef.put(filePicked, metadata)
                .then(function(snapshot) {
                    filmUrl = snapshot.downloadURL;
                    // console.log(filmUrl);
                    uploadFilmOnFirebase();
                })
                .catch(function(error) {
                    alert('Lỗi trong quá trình tải ảnh lên');
                    // console.error('Upload failed:', error);
                });
        }

        function uploadFilmOnFirebase() {
            var ref = firebase.database().ref('listFilms');
            var newKey = ref.push().key;
            var month = $scope.filmMonth.substr(6, $scope.filmMonth.length - 6);
            if (month.length == 1) month = '0' + month;
            var year = $scope.filmYear.substr(4, $scope.filmYear.length - 4);
            var newFilm = {
                name: $scope.filmName,
                content: $scope.filmContent,
                month: month,
                year: year,
                time: month + '-' + year,
                genre: $scope.filmGenre,
                url: filmUrl,
                key: newKey
            }
            ref.child(newKey).set(newFilm).then(function() {
                alert('Phim đã tải lên thành công');
                window.location.href = '/';
            });
        }
    }
]);



$("#fileInput").change(function() {
    readURL(this);
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#imageFilm').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}