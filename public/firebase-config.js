// replace placeholders with your actual config from Firebase console
const firebaseConfig = {
  apiKey: "FiveMBrandApiKey",
  authDomain: "fivem-brand-n.firebaseapp.com",
  projectId:"fiveMBrand",
  // ...
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
