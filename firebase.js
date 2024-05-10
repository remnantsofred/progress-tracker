import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'


const config = {
  apiKey: "AIzaSyBBoiLPu7_MQtORnBFXzuYNx9Usrhw5Hp0",
  authDomain: "hufflam-task-tracker.firebaseapp.com",
  projectId: "hufflam-task-tracker",
  storageBucket: "hufflam-task-tracker.appspot.com",
  messagingSenderId: "541359322776",
  appId: "1:541359322776:web:438f16a0f3b08f1a30c2ed",
  measurementId: "G-YD4DKV6JB2"
};

export const startFirebase = () => {
  firebase.initializeApp(config);
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };
  
  ui.start('#firebaseui-auth-container', uiConfig);
}