// DOM Elements
const modalBackground = document.querySelector(".bground");
const modalCloseButton = document.querySelector(".close");
const modalButtons = document.querySelectorAll(".modal-btn");
const formInputs = document.querySelectorAll(".formData");

// launch modal event
modalButtons.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form *lance
function launchModal() {
  // modalBackground.style.display = "block";
  modalBackground.classList.add("active");
}

function editNav() {
  const topnav = document.getElementById("myTopnav");
  // if (topnav.className === "topnav") {
  //   topnav.className += " responsive";
  // } else {
  //   topnav.className = "topnav";
  // }
  topnav.classList.toggle("responsive");
}
 
//close modal
modalCloseButton.addEventListener("click",closeModal)

function closeModal(){
  modalBackground.classList.remove('active');
}

// $('body').click(function() {
//   if (!$(this.target).is('#popUpForm')) {
//     $(".modalDialog").hide();
//   }
// });