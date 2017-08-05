// console.log('facebook.js');
angular.module('CinemaApp').controller('loginFacebookController', ['$scope',
    function($scope) {

        var providerFacebook = new firebase.auth.FacebookAuthProvider();

        // console.log('Controller Facebook');

        $scope.loginFacebook = function() {
            // console.log('func Facebook');

            // firebase.auth().signInWithPopup(providerFacebook)
            //     .then(function(result) {
            //         // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            //         var token = result.credential.accessToken;
            //         // The signed-in user info.
            //         var user = result.user;
            //         // console.log('user', user.uid);
            //         firebase.database().ref('listUsers/' + user.uid).once('value')
            //             .then(function(snapshot) {
            //                 // console.log(snapshot);
            //                 if (snapshot.val() === null) {
            //                     // console.log('null');
            //                     addUserToDatabase(user);
            //                 } else {
            //                     window.location.href = '/';
            //                 }
            //             });

            //     }).catch(function(error) {
            //         // Handle Errors here.
            //         var errorCode = error.code;
            //         var errorMessage = error.message;
            //         // The email of the user's account used.
            //         var email = error.email;
            //         // The firebase.auth.AuthCredential type that was used.
            //         var credential = error.credential;
            //         // console.log(errorCode, errorMessage, email, credential);
            //         alert('Tài khoản email này đã được dùng để xác thực đăng nhập bằng Google');
            //         window.location.href = '/';
            //     });

            var auth = firebase.auth();
            auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
                .then(function(result) {
                    // console.log('first with FB');
                    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    // console.log('user', user.uid);
                    firebase.database().ref('listUsers/' + user.uid).once('value')
                        .then(function(snapshot) {
                            // console.log(snapshot);
                            if (snapshot.val() === null) {
                                // console.log('snap shot null');
                                addUserToDatabase(user);
                            } else {
                                // console.log('just login');
                                window.location.href = '/';
                            }
                        })
                })
                .catch(function(error) {
                    // console.log('other login');
                    // An error happened.
                    if (error.code === 'auth/account-exists-with-different-credential') {
                        // Step 2.
                        // User's email already exists. The pending Facebook credential.
                        var pendingCred = error.credential; // The provider account's email address.
                        var email = error.email; // Get registered providers for this email.
                        auth.fetchProvidersForEmail(email).then(function(providers) {
                            // Step 3.
                            // If the user has several providers, the first provider in the list will be the "recommended" provider to use.

                            /*
                            if (providers[0] === 'password') {
                                console.log('login password');
                                // Asks the user his password. In real scenario, you should handle this asynchronously.
                                var password = promptUserForPassword();
                                // TODO: implement promptUserForPassword.
                                auth.signInWithEmailAndPassword(email, password).then(function(user) {
                                    // Step 4a.
                                    return user.link(pendingCred);
                                }).then(function() {
                                    window.location.href = '/';
                                });
                                return;
                            }
                            */



                            // console.log('login other');
                            // All the other cases are external providers. Construct provider object for that provider.

                            // TODO: implement getProviderForProviderId.
                            // var provider = getProviderForProviderId(providers[0]);

                            // At this point, you should let the user know that he already has an account
                            // but with a different provider, and let him validate the fact he wants to
                            // sign in with this provider.
                            // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
                            // so in real scenario you should ask the user to click on a "continue" button
                            // that will trigger the signInWithPopup.

                            var alert = confirm("Bạn đã đăng nhập tài khoản này bằng Google. Bạn có muốn liên kết nó với tài khoản Facebook?");
                            if (alert == true) {
                                // console.log('click ok');
                                var provider = new firebase.auth.GoogleAuthProvider();
                                auth.signInWithRedirect(provider).then(function(result) {
                                    // console.log('login google');
                                    // Remember that the user may have signed in with an account that has a different email
                                    // address than the first one. This can happen as Firebase doesn't control the provider's
                                    // sign in flow and the user is free to login using whichever account he owns.

                                    // Step 4b.
                                    // Link to Facebook credential.
                                    result.user.link(pendingCred).then(function() {
                                        // console.log('link account');
                                        // Facebook account successfully linked to the existing Firebase user.
                                        window.location.href = '/';
                                    });
                                });
                            }
                        });
                    }
                });
        }

        function addUserToDatabase(user) {
            // console.log('add user with FB', user);
            firebase.database().ref('listUsers/' + user.uid).set({
                email: user.email,
                username: user.displayName,
                avatar: user.photoURL,
                tel: user.phoneNumber
            }).then(function() {
                window.location.href = '/';
            });
        }

    }
]);