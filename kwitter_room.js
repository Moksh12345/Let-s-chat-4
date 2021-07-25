//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
  apiKey: "AIzaSyBIaw9X0dVKFsSwZTH6gdu693BsNMJKtWs",
  authDomain: "test2-7ad75.firebaseapp.com",
  databaseURL: "https://test2-7ad75-default-rtdb.firebaseio.com",
  projectId: "test2-7ad75",
  storageBucket: "test2-7ad75.appspot.com",
  messagingSenderId: "281259938812",
  appId: "1:281259938812:web:3c4f19280779661600d879"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
Username = localStorage.getItem("username");
document.getElementById("greeting").innerHTML = "Welcome back " + Username;

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("trending_rooms").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
              childKey = childSnapshot.key;
              Room_names = childKey;
              //Start code
              console.log("Room name: " + Room_names);
              row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
              document.getElementById("trending_rooms").innerHTML += row;
              //End code
        });
  });
}
getData();

//code for room
function add_room() {
  Room_Name = document.getElementById("room_input").value;
  firebase.database().ref("/").child(Room_Name).update({
        purpose: "add_room_name"
  });
  localStorage.setItem("Room_Name", Room_Name);
  window.location = "kwitter_page.html";
}

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("Room_Name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("Room_Name");
  window.location = "index.html";
}