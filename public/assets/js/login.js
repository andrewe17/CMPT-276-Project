

function signup(){

  $.ajax({
      method: 'get',
      url:'./signup',
      success: check
    });
}
function success(){
document.getElementById("Loginfail").style.display = "";
}
function check(json){
  console.log(jason);
  // if (json.rowCount > 0) {
  //   document.getElementById("alert").style.display = "";
  // }
  // else {
  //   document.getElementById("id01").style.display = "none";
  //   document.getElementById("Success").style.display = "";
  // }
}
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
