(() => {

  angular.module('CinemaApp').controller('loginFacebookController', ['$scope', function ($scope) {

    var providerFacebook = new firebase.auth.FacebookAuthProvider();

    $scope.loginFacebook = function () {

      var auth = firebase.auth();
      auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((result) => {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          firebase.database().ref(`listUsers/${user.uid}`).once('value')
            .then((snapshot) => {
              if (snapshot.val() === null) {
                addUserToDatabase(user);
              } else {
                window.location.href = '/';
              }
            });
        })
        .catch((error) => {
          // An error happened.
          if (error.code === 'auth/account-exists-with-different-credential') {
            // Step 2.
            // User's email already exists. The pending Facebook credential.
            var pendingCred = error.credential; // The provider account's email address.
            var email = error.email; // Get registered providers for this email.
            auth.fetchProvidersForEmail(email).then((providers) => {
              // Step 3.
              // If the user has several providers, the first provider in the list will be the "recommended" provider to use.
              // All the other cases are external providers. Construct provider object for that provider.
              // TODO: implement getProviderForProviderId.
              // var provider = getProviderForProviderId(providers[0]);

              // At this point, you should let the user know that he already has an account
              // but with a different provider, and let him validate the fact he wants to
              // sign in with this provider.
              // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
              // so in real scenario you should ask the user to click on a "continue" button
              // that will trigger the signInWithPopup.

              var alert = confirm('B???n ???? ????ng nh???p t??i kho???n n??y b???ng Google. B???n c?? mu???n li??n k???t n?? v???i t??i kho???n Facebook?');
              if (alert == true) {
                var provider = new firebase.auth.GoogleAuthProvider();
                auth.signInWithRedirect(provider).then((result) => {
                  // Remember that the user may have signed in with an account that has a different email
                  // address than the first one. This can happen as Firebase doesn't control the provider's
                  // sign in flow and the user is free to login using whichever account he owns.

                  // Step 4b.
                  // Link to Facebook credential.
                  result.user.link(pendingCred).then(() => {
                    // Facebook account successfully linked to the existing Firebase user.
                    window.location.href = '/';
                  });
                });
              }
            });
          }
        });
    };

    function addUserToDatabase(user) {
      firebase.database().ref(`listUsers/${user.uid}`).set({
        email: user.email,
        username: user.displayName,
        avatar: user.photoURL,
        tel: user.phoneNumber
      }).then(() => {
        window.location.href = '/';
      });
    }
  }
  ]);
})();
