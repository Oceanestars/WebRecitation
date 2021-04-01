function setup() {
  //Your firebase config will have different things
  var firebaseConfig = {
    apiKey: "AIzaSyCgyAvpxyPfSPlSqg2uICnnjS2V-nnaIas",
    authDomain: "logindemo-3f56b.firebaseapp.com",
    projectId: "logindemo-3f56b",
    databaseURL: "https://logindemo-3f56b-default-rtdb.firebaseio.com/",
    storageBucket: "logindemo-3f56b.appspot.com",
    messagingSenderId: "788945816214",
    appId: "1:788945816214:web:c9d1c4c92a34c18cbf90b7",
    measurementId: "G-2103VKJKXQ"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  // Remove data inside database , Keep commented to retrieve data(fast way to delete instead of manually doing it)
  // var adaRef = firebase.database().ref('Users');
  // adaRef.remove()
  //   .then(function() {
  //     console.log("Remove succeeded.")
  //   })
  //   .catch(function(error) {
  //     console.log("Remove failed: " + error.message)
  //   });
}

function resetPass() {
  var notyf = new Notyf();
  var emailAddress = document.getElementById("emailVal").value;
  var auth = firebase.auth();
  auth.sendPasswordResetEmail(emailAddress).then(function() {
    notyf.success('An email was sent to your email.');
  }).catch(function(error) {
    // An error happened.
    console.log("Wrong email or email dis not in database");
  });
}

function errData(err) {
  console.log(err);
}

function loggingIn() {
  var notyf = new Notyf();
  console.log("Logging In");
  var email = document.getElementById("emailVal").value;
  var password = document.getElementById("passVal").value;
  const promise = firebase.auth().signInWithEmailAndPassword(email, password);
  //A promise is a returned object to which you attach callbacks(A callback is a function passed as an argument to another function), 
  //instead of passing callbacks into a function.
  promise.then(function(data) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user && user.emailVerified == true) { // User is signed in.
        notyf.success('Logged in successfully');
        print("User ", user)
        introPage();
      } else {
        notyf.error('you need to verify your email');
      }
    });
  }, function(error) {
    promise.catch(e => alert(e.message));
  });
}

function signingUp() {
  var notyf = new Notyf();
  console.log("Signing Up");
  var email = document.getElementById("emailVal").value;
  var password = document.getElementById("passVal").value;
  var name = document.getElementById("nameVal").value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(result) {
      notyf.success('You successfully created an account!');
      return result.user.updateProfile({
        displayName: name
      })
    }).catch(function(error) {
      console.log(error);
    });
  setTimeout(function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user && user.emailVerified == false) {
        firebase.database().ref('Users/' + user.uid).set({
          email: user.email,
          uid: user.uid,
          displayName: user['displayName']
        });

        user.sendEmailVerification().then(function() {
          // Email sent.
          console.log("Verify your email");
        }).catch(function(error) {
          // An error happened.
          console.log("this did not work");
        });
      }
    });
  }, 3000);
}

function introPage() {
  setTimeout(function () {
    window.location.href = 'http://localhost:3000/youPage.html';
  }, 2000);
}

function setName(){
  document.getElementById("name").innerHTML = firebase.auth().currentUser.displayName;
}
