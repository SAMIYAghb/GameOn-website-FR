// DOM Elements
const modalBackground = document.querySelector(".bground");
const modalCloseButton = document.querySelector(".close");
console.log(modalCloseButton);
const modalButtons = document.querySelectorAll(".modal-btn");
// const formInputContainer = document.querySelectorAll(".formData");
const form = document.querySelector("form");
// On récupère les champs
const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const birthdate = document.querySelector("#birthdate");
const condition = document.getElementById("checkbox1");
const quantity = document.getElementById("quantity");
const tournameLocation = document.getElementsByName("location");
const submitBtn = document.querySelector(".btn-submit");
const validationModal = document.querySelector(".modal-confirmation");

// launch modal event
modalButtons.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form *lance
function launchModal() {
  modalBackground.classList.add("active");
}
//close modal
modalCloseButton.addEventListener("click", closeModal);
//close modal function
function closeModal() {
  modalBackground.classList.remove("active");
  resetForm();
}
function editNav() {
  const topnav = document.getElementById("myTopnav");
  topnav.classList.toggle("responsive");
}

// Fonction pour effectuer le trim sur la valeur d'un champ
// La méthode trim() permet de retirer les blancs en début et fin de chaîne
function getTrimmedValue(field) {
  return field.value.trim();
}

// Fonction générique de validation
function isFieldValid(field, regex, errorMessage) {
  
  const trimmedValue = getTrimmedValue(field);
  // Récupérer le texte du label associé au champ
  const label = document.querySelector(`label[for="${field.id}"]`);
  const labelText = label.textContent.trim();
  if (trimmedValue === "") {
    showErrormessage(field, `Veuillez entrer 2 caractères ou plus pour le ${labelText}.`);
    return false;
  }

  const isValidFormat = regex.test(trimmedValue);

  if (!isValidFormat) {
    showErrormessage(field, errorMessage);
    return false;
  }

  clearErrorMessages(field);
  return true;
}
// Appliquer la Fonction générique de validation sur les inputs pour Check si inputs sont valid 
function isFirstnameValid() {
  const regexFirstname = /^[a-zA-ZÀ-ÿ- ]{2,}$/;
  return isFieldValid(firstName, regexFirstname, "Le prénom doit contenir au moins 2 caractères et peut inclure des lettres, des espaces, des tirets et des accents.");
}

function isLastnameValid() {
  const regexLastname = /^[a-zA-ZÀ-ÿ- ]{2,}$/;
  return isFieldValid(lastName, regexLastname, "Le nom de famille doit contenir au moins 2 caractères et peut inclure des lettres, des espaces, des tirets et des accents.");
}
// function isEmailValid() {
//   const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return isFieldValid(email, regexEmail, "Veuillez entrer une adresse e-mail valide.");
// }


function isEmailValid() {
  const trimmedEmail = getTrimmedValue(email);
  if (trimmedEmail === '') {
    // Si l'email est vide, on retourne false
    showErrormessage(email, "Veuillez entrer une adresse e-mail.");
    return false;
  }

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

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
  
  const trimmedBirthdate = getTrimmedValue(birthdate);

  if (trimmedBirthdate === "") {
    // Afficher un message d'erreur pour une date vide
    showErrormessage(birthdate, "Vous devez entrer votre date de naissance.");
    return false;
  }

  const isDateFormatValid = /[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(trimmedBirthdate);

  if (!isDateFormatValid) {
    // Afficher un message d'erreur pour un format de date incorrect
    showErrormessage(
      birthdate,
      "Veuillez renseigner une date de naissance au bon format."
    );
    return false;
  } else {
    // Effacer les messages d'erreur précédents pour la date de naissance
    clearErrorMessages(birthdate);
  }
  const date = new Date(trimmedBirthdate);
  const currentDate = new Date();

  if (date.getFullYear() > 1930) {
  // Comparer la date de naissance avec la date actuelle
  if (date.getTime() > currentDate.getTime()) {
    // Afficher un message d'erreur pour une date future
    showErrormessage(
      birthdate,
      "La date de naissance ne peut pas être dans le futur."
    );
    return false;
  }

  // Calculer l'âge en années selon la date selectionné
  const age = currentDate.getFullYear() - date.getFullYear();
  // Vérifier si l'âge est inférieur à 16 ans
  if (age < 16) {
    // Afficher un message d'erreur pour un âge inférieur à 16 ans 2008
    showErrormessage(
      birthdate,
      "Vous devez avoir au moins 16 ans pour vous inscrire."
    );
    return false;
  } else {
    // Effacer les messages d'erreur précédents pour la date de naissance
    clearErrorMessages(birthdate);
  }
}else {
  // Afficher un message d'erreur pour une date de naissance trop ancienneshowErrormessage(
    showErrormessage(birthdate,
      "La date de naissance ne peut pas être antérieure à 1930."
    );}
  return true;
}

function isQuantityValid() {
  const quantityValue = getTrimmedValue(quantity);

  // Si la quantité est vide, afficher un message d'erreur
  if (quantityValue === "") {
    showErrormessage(quantity, "Veuillez renseigner ce champ.");
    return false;
  } else {
    // Effacer les messages d'erreur précédents pour la quantité
    clearErrorMessages(quantity);
  }

  // // Vérifier si la quantité est une valeur numérique
  // Convertir la quantité en nombre
  //  pourrait retourner NaN
  const quantityNumber = parseInt(quantityValue);
  // console.log(quantityNumber);
  // parseIn sert à convertir une valeur de chaîne (string) en un nombre entier (integer) 
  if (isNaN(quantityValue)) {
    // Afficher un message d'erreur pour une valeur non numérique
    showErrormessage(quantity, "La quantité doit être une valeur numérique.");
    return false;
  } else {
    // Effacer les messages d'erreur précédents pour la quantité
    clearErrorMessages(quantity);
  }
    // Vérifier si la quantité est entre 0 et 99
    if (quantityNumber < 0 || quantityNumber > 99) {
      // Afficher un message d'erreur pour une quantité hors de la plage
      showErrormessage(quantity, "La quantité doit être entre 0 et 99.");
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
    showErrormessage(
      condition,
      "Vous devez vérifier que vous acceptez les termes et conditions."
    );
    return false;
  }
  return true;
}

// fonction pour afficher les messages d'erreur
function showErrormessage(element, message) {
  // Vérifier si l'élément existe
  if (element) {
    // Trouver le conteneur du champ (form-data)
    const formInputContainer = element.closest(".formData");
    // Vérifier si le conteneur existe
    if (formInputContainer) {
      // Ajouter l'attribut data-error au conteneur avec le message d'erreur
      formInputContainer.setAttribute("data-error", message);

      // Ajouter l'attribut data-error-visible au conteneur pour le rendre visible
      formInputContainer.setAttribute("data-error-visible", "true");
    }
  }
}
// fonction pour effacer les messages d'erreur précédents
function clearErrorMessages(element) {
  // Vérifier si l'élément existe
  if (element) {
    //  la méthode closest() pour trouver l'élément ascendant le plus proche qui correspond au sélecteur CSS spécifié (ici, ".formData").
    const formInputContainer = element.closest(".formData");
    // Vérifier si le conteneur existe
    if (formInputContainer) {
      // Supprimer l'attribut data-error du conteneur
      formInputContainer.removeAttribute("data-error");

      // Supprimer l'attribut data-error-visible du conteneur pour le rendre invisible
      formInputContainer.removeAttribute("data-error-visible");
    }
  }
}

// Fonction pour effacer tous les messages d'erreur
function clearAllErrorMessages() {
  const formElements = [firstName, lastName, email, birthdate, quantity, ...tournameLocation, condition];
  formElements.forEach(clearErrorMessages);
}

// Fonction de réinitialisation du formulaire
function resetForm() {
  const formElements = [firstName, lastName, email, birthdate, quantity];
  formElements.forEach((element) => {
    element.value = '';
    clearErrorMessages(element);
  });
}

// Gestionnaire d'événement de soumission du formulaire
form.addEventListener("submit", (event) => {
  // On empêche le comportement par défaut
  event.preventDefault();

  // Effacer les messages d'erreur précédents
  clearAllErrorMessages();
    const validations = [
      isFirstnameValid(),
      isLastnameValid(),
      isEmailValid(),
      isBirthdateValid(),
      isQuantityValid(),
      isLocationValid(),
      isConditionValid(),
    ];
    // Soumettre le formulaire si tous les champs sont valides
    // La méthode every() permet de tester si tous les éléments d'un tableau vérifient une condition donnée par une fonction en argument. Cette méthode renvoie un booléen pour le résultat du test.
    if (validations.every((isValid) => isValid)) {
      form.submit();
      closeModal();
      validationModal.classList.add("active");
      // validationModal.style.display = "block";
    }
});
// const closeConfirmButton = document.querySelector("#closeConfirm");
// closeConfirmButton.addEventListener("click", closeModal);


const closeConfirmationButton = document.getElementById("closeConfirm");

// Gestionnaire d'événement pour le bouton de fermeture de la modalité de confirmation
closeConfirmationButton.addEventListener("click", closeConfirmationModal);

// Fonction pour fermer la modalité de confirmation
function closeConfirmationModal() {
  validationModal.style.display = "none";
}