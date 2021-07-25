//YOUR FIREBASE LINKS
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

var user_name = localStorage.getItem("username");
var room_name = localStorage.getItem("Room_Name");

function send() {
    msg = document.getElementById("message").value;
    firebase.database().ref(room_name).push({
          name: user_name,
          message: msg,
          like: 0
    });
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
          document.getElementById("output").innerHTML = "";
          snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                childData = childSnapshot.val();
                if (childKey != "purpose") {
                      firebase_message_id = childKey;
                      message_data = childData;
                      //Start code
                      console.log(firebase_message_id);
                      console.log(message_data);
                      name = message_data['name'];
                      message = message_data['message'];
                      like = message_data['like'];
                      name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
                      message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                      like_button = "<button type='button' class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                      span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

                      row = name_with_tag + message_with_tag + like_button + span_with_tag;
                      document.getElementById("output").innerHTML += row;
                      //End code
                }
          });
    });
}
getData();

function updateLike(message_id) {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
          like: updated_likes
    });

}

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("Room_Name");
    window.location = "index.html";
}