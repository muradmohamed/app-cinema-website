// console.log('facebook.js');

var provider = new firebase.auth.FacebookAuthProvider();

angular.module('CinemaApp').controller('loginFacebookController', ['$scope',
    function($scope) {

        // console.log('Controller Facebook');

        $scope.loginFacebook = function() {
            // console.log('func Facebook');

            firebase.auth().signInWithPopup(provider)
                .then(function(result) {
                    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    // console.log('user', user.uid);
                    firebase.database().ref('listUsers/' + user.uid).once('value')
                        .then(function(snapshot) {
                            // console.log(snapshot);
                            if (snapshot.val() === null) {
                                // console.log('null');
                                addUserToDatabase(user);
                            } else {
                                window.location.href = '/';
                            }
                        });

                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                    console.log(errorCode, errorMessage, email, credential);
                });
        }

        function addUserToDatabase(user) {
            // console.log(user);
            firebase.database().ref('listUsers/' + user.uid).set({
                email: user.email,
                username: user.displayName,
            }).then(function() {
                window.location.href = '/';
            });
        }

    }
]);