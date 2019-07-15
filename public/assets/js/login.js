
function signin(){
  $.ajax({
      url:'./signin',
      success: success
    });
}
function signup(){
  $.ajax({
      url:'./signup',
      success: check
    });
}
function success(json){
  console.log("testing");
  console.log(json);
  if (json == 2) {
    document.getElementById("Loginfail").style.display = "";
  }
}
function check(json){
  if (json == 1) {
    document.getElementById("alert").style.display = "";
  }
  else if (json == 0){
    document.getElementById("id01").style.display = "none";
    document.getElementById("Success").style.display = "";
  }
}
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
