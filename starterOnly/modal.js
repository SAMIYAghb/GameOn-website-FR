// DOM Elements
const modalBackground = document.querySelector(".bground");
const modalCloseButton = document.querySelector(".close");
const modalButtons = document.querySelectorAll(".modal-btn");
// const formInputContainer = document.querySelectorAll(".formData");
const form = document.querySelector('form');
const modalConfirm = document.querySelector(".modal-confirmation");
// On récupère les champs
const firstName= document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const birthdate = document.querySelector("#birthdate");
const condition = document.getElementById("checkbox1");
const quantity = document.getElementById("quantity");
const tournameLocation = document.getElementsByName("location");
const submitBtn = document.querySelector('.btn-submit');

// launch modal event
modalButtons.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form *lance
function launchModal() {
  modalBackground.classList.add("active");
}

function editNav() {
  const topnav = document.getElementById("myTopnav");
  topnav.classList.toggle("responsive");
}
 
//close modal
modalCloseButton.addEventListener("click",closeModal)
//close modal function
function closeModal(){
  modalBackground.classList.remove('active');
}

 // Check si inputs sont valid
function isFirstnameValid() {
  const trimmedFirstName = firstName.value.trim();
  // Si le prénom est vide, afficher un message d'erreur et retourner false
  if (trimmedFirstName === '') {
    // Afficher un message d'erreur pour le prénom vide
    showErrormessage(firstName, "Veuillez entrer votre prénom.");
    return false;
  }

  // Vérifier la longueur du prénom
  // Si le prénom est trop court, afficher un message d'erreur
  const isValid = trimmedFirstName.length >= 2;
  if (!isValid) {
    // Afficher un message d'erreur pour un prénom trop court
    showErrormessage(firstName, "Le prénom doit contenir au moins 2 caractères.");
  } else {
    // Effacer les messages d'erreur précédents pour le prénom
    clearErrorMessages(firstName);
  }

  return isValid;
}
  
function isLastnameValid() {
  // return lastName.value.trim().length >= 2;
  const trimmedLastName = lastName.value.trim();
  if (trimmedLastName === '') {
    // Afficher un message d'erreur pour le nom de famille vide
    showErrormessage(lastName, "Veuillez entrer votre nom de famille.");
    return false;
  }

  // Vérifier la longueur du nom de famille
  const isValid = trimmedLastName.length >= 2;
  if (!isValid) {
    // Afficher un message d'erreur pour un nom de famille trop court
    showErrormessage(lastName, "Le nom de famille doit contenir au moins 2 caractères.");
  } else {
    // Effacer les messages d'erreur précédents pour le nom de famille
    clearErrorMessages(lastName);
  }
  return isValid;
}

function isEmailValid() {
  const trimmedEmail = email.value.trim();
  if (trimmedEmail === '') {
    // Si l'email est vide, on retourne false
    showErrormessage(email, "Veuillez entrer une adresse e-mail.");
    return false;
  }

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
  console.log('Email validation result:', isValid);

  if (!isValid) {
    // Si l'email n'est pas valide, afficher un message d'erreur
    showErrormessage(email, "Veuillez entrer une adresse e-mail valide.");
  } else {
    // Effacer les messages d'erreur précédents pour l'email
    clearErrorMessages(email);
  }

  return isValid;
}

function isBirthdateValid() {
  const trimmedBirthdate = birthdate.value.trim();

  if (trimmedBirthdate === '') {
    // Afficher un message d'erreur pour une date vide
    showErrormessage(birthdate, "Veuillez renseigner votre date de naissance.");
    return false;
  }

  const isDateFormatValid = /[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(trimmedBirthdate);

  if (!isDateFormatValid) {
    // Afficher un message d'erreur pour un format de date incorrect
    showErrormessage(birthdate, "Veuillez renseigner une date de naissance au bon format.");
  } else {
    // Effacer les messages d'erreur précédents pour la date de naissance
    clearErrorMessages(birthdate);
  }

  const date = new Date(trimmedBirthdate);
  const currentDate = new Date();

   // Comparer la date de naissance avec la date actuelle
   if (date.getTime() > currentDate.getTime()) {
    // Afficher un message d'erreur pour une date future
    showErrormessage(birthdate, "La date de naissance ne peut pas être dans le futur.");
    return false;
  } else {
    // Effacer les messages d'erreur précédents pour la date de naissance
    clearErrorMessages(birthdate);
  }

  return true;

}


function isQuantityValid() {
  const quantityValue = quantity.value.trim();

  // Si la quantité est vide, afficher un message d'erreur
  if (quantityValue === '') {
    showErrormessage(quantity, "Veuillez renseigner ce champ.");
    return false;
  } else {
    // Effacer les messages d'erreur précédents pour la quantité
    clearErrorMessages(quantity);
  }

  return true;
}

function isLocationValid() {
  let isSelected = false;
  for (let i = 0; tournameLocation.length > i; i++) {
    if (tournameLocation[i].checked) {
      isSelected = true;
      break;
    }
  }
  if (!isSelected) {
    // Aucune location n'a été sélectionnée, afficher un message d'erreur
    showErrormessage(tournameLocation[0], "Vous devez choisir une option.");
  }
  return isSelected;
}

function isConditionValid() {
  if (!condition.checked) {
    // La condition n'est pas validée, afficher un message d'erreur
    showErrormessage(condition, "Vous devez vérifier que vous acceptez les termes et conditions.");
    return false;
  }
  return true;
}

// fonction pour afficher les messages d'erreur
function showErrormessage(element, message) {
  // element.textContent = message;
// Vérifier si l'élément existe
if (element) {
  // Trouver le conteneur du champ (form-data)
  const formInputContainer = element.closest('.formData');
  // Vérifier si le conteneur existe
  if (formInputContainer) {
     // Créer un élément div pour le message d'erreur
    let errorDiv = document.createElement("div");
    errorDiv.textContent = message;
    errorDiv.classList.add("error-message");
     // Ajouter le message d'erreur au conteneur
     formInputContainer.appendChild(errorDiv);
  }
}
}
// fonction pour effacer les messages d'erreur précédents
function clearErrorMessages(element) {
  // Supprimer tous les éléments avec la classe "error-message"
  let existingErrorMessages = element.parentElement.querySelectorAll(".error-message");
  existingErrorMessages.forEach((error) => error.remove());
}


form.addEventListener("submit", (event) => {
  // On empêche le comportement par défaut
    event.preventDefault();

     // Effacer les messages d'erreur précédents
  clearErrorMessages(firstName);
  clearErrorMessages(lastName);
  clearErrorMessages(email);
  clearErrorMessages(birthdate);
  clearErrorMessages(quantity);
  // clearErrorMessages(tournameLocation);
  tournameLocation.forEach(element => clearErrorMessages(element));
  clearErrorMessages(condition);

  // Vérifier chaque champ et afficher un message d'erreur si nécessaire
  const isFirstNameValid = isFirstnameValid();
  const isLastNameValid = isLastnameValid();
  const isEmailValidResult = isEmailValid();
  const isBirthdateValidResult = isBirthdateValid();
  const isQuantityValidResult = isQuantityValid();
  const isLocationValidResult = isLocationValid();
  const isConditionValidResult = isConditionValid();
  //pour verifier si le form (all inputs) sont valid ou non
  if (
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValidResult &&
    isBirthdateValidResult &&
    isQuantityValidResult &&
    isLocationValidResult &&
    isConditionValidResult
  ) {
      // console.log("errNotsSubmit");
      // Soumettre le formulaire si tous les champs sont valides
       // Form submit
    form.submit();
    closeModal();

  modalConfirm.style.display = "block";
    
    } 

});

