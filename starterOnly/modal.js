// DOM Elements
const modalBackground = document.querySelector(".bground");
const modalCloseButton = document.querySelector(".close");
const modalButtons = document.querySelectorAll(".modal-btn");
const formInputs = document.querySelectorAll(".formData");
const form = document.querySelector('form');

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

//validation du form


// Ajout d'un écouteur d'événement sur le formulaire pour écouter le submit
// form.addEventListener("submit", (event) => {
//   // On empêche le comportement par défaut
//   event.preventDefault();
//   // On fait la vérification.
//   const firstName = document.getElementById('first');
//   // const valeurFirstName = firstName.value;
//   if (valeurFirstName === "") {
//       console.log('Le champ nom est vide');
//       // firstName.setAttribute(data-error, 'Le champ nom est vide');
//   } else {
//       console.log('Le champ nom est rempli');
//   }

// });