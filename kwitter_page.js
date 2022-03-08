const firebaseConfig = {
  apiKey: "AIzaSyASUSruZ3AgojoZ0w3b5sD2SSBoSECDl7E",
  authDomain: "prac-19681.firebaseapp.com",
  databaseURL: "https://prac-19681-default-rtdb.firebaseio.com",
  projectId: "prac-19681",
  storageBucket: "prac-19681.appspot.com",
  messagingSenderId: "39714846491",
  appId: "1:39714846491:web:14a6ec922cbe6bc52685be",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0,
  });
  document.getElementById("msg").value = "";
}

function getData() {
  firebase
    .database()
    .ref("/" + room_name)
    .on("value", function (snapshot) {
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
          name = message_data["name"];
          message = message_data["message"];
          like = message_data["like"];
          name_with_tag =
            "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
          msg_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
          like_btn =
            "<button class='btn btn-warning' id=" +
            firebase_message_id +
            " value=" +
            like +
            " onclick='updateLike(this.id)'>";
          span_tag =
            "<span class='glyphicon glyphicon-thumbs-up'>Like : " +
            like +
            "</span></button><hr>";
          row = name_with_tag + msg_with_tag + like_btn + span_tag;
          document.getElementById("output").innerHTML += row;
          //End code
        }
      });
    });
}
getData();
function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}
function updateLike(message_id) {
  console.log("Clicked on like button - " + message_id);
  button_id = message_id;
  likes_no = document.getElementById(button_id).value;
  updated_like = Number(likes_no) + 1;
  console.log(updated_like);
  firebase.database().ref(room_name).child(message_id).update({
    like: updated_like,
  });
}
