mybutton = document.getElementById("myBtn");
let firstname = document.querySelector("#first_name");
let lastname = document.querySelector("#last_name");
let number = document.querySelector("#phone_number");
let select = document.querySelector("#options");
const form = document.querySelector("#contact_form");
const navSlide = () => {
    const mobileMenu = document.querySelector('.menu_mobile');
    const navbar = document.querySelector('.navbar__menu');
    const close_button = document.querySelector('.navbar__close');

    mobileMenu.addEventListener('click', () => {
        navbar.classList.add('navbar_active');
    });
    close_button.addEventListener('click', () => {
        navbar.classList.remove('navbar_active');
    })
}
document.documentElement.classList.remove("no-js");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function addErroMessage(error_message, where) {
    let newSpan = document.createElement('span');
    newSpan.classList.add('error_text');
    newSpan.innerText = error_message;
    let destination = where.parentNode.querySelector('.error_area');
    destination.append(newSpan);
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const errors = {
        emptyField: 'This field is required',
        emptySelect: 'Select any option',
        nonLettersInput: 'Enter only big and small letters',
        minimumCharacter: 'You have to enter minimum y characters',
        maximumCharacter: 'You have to enter maximum y characters',
        invalidTelephoneNumber: 'Enter valid telephone number'

    }

    removeErrors();
    validateFirstName(firstname, errors);
    validateLastName(lastname, errors);
    validateTelephoneNumber(number, errors);
    validateEmptyOption(select, errors.emptySelect);

    if (document.querySelectorAll('.error_text').length === 0) {
        alert(`${firstname.value} ${lastname.value}, our support team will get back to you on number ${number.value} in ${select[select.selectedIndex].text}`);
        firstname.value = '';
        lastname.value = '';
        number.value = '';
        select.value = '0'
    } else {
        
    }
});

const removeErrors = () => {
    let spans = document.querySelectorAll('.error_text');
    spans.forEach((el) => {
        el.parentElement.removeChild(el)
    })
}
let validateEmpty = (field, errorMessage) => {
    if (field.value === '') {
        addErroMessage(errorMessage, field)
        return true;
    } else {
        return false;
    }
}
let validateEmptyOption = (field, errorMessage) => {
    if (field.value === '0') {
        addErroMessage(errorMessage, field)
        return true;
    } else {
        return false;
    }
}
const checkOnlyLetter = (field, errorMessage) => {
    let letters = /^[\s\p{L}]+$/u;
    if(field.value.match(letters)) {
        return false;
    } else {
        addErroMessage(errorMessage, field);
        return true;
    }
}
const checkPhoneNumber = (field, errorMessage) => {
    let numbers = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
    if (field.value.match(numbers)){
        return false;
    } else {
        addErroMessage(errorMessage, field)
        return true;
    }
}
const checkMinimumCharacters = (field, errorMessage, minimumCharacter) => {
    if (field.value.length < minimumCharacter) {
        let newErroMessage = errorMessage.replace("y", minimumCharacter.toString())
        addErroMessage(newErroMessage, field)
        return true;
    } else {
        return false;
    }
}

const checkMaximumCharacters = (field, errorMessage, maximumCharacter) => {
    if (field.value.length > maximumCharacter) {
        let newErroMessage = errorMessage.replace("y", maximumCharacter.toString())
        addErroMessage(newErroMessage, field)
        return true;
    } else {
        return false;
    }
}

const clearFieldError = (field) => {
    let error = field.parentNode.querySelector('.error_area')
    error.removeChild(error.querySelector('.error_text'))
}
const validateFirstName = (field, errors) => {
    if (validateEmpty(field, errors.emptyField)) {
        clearFieldError(field);
        validateEmpty(field, errors.emptyField);
    } else if (checkMinimumCharacters(field, errors.minimumCharacter, 3)) {
        clearFieldError(field);
        checkMinimumCharacters(field, errors.minimumCharacter, 3);
    } else if(checkMaximumCharacters(field, errors.maximumCharacter, 50)) {
        clearFieldError(field);
        checkMaximumCharacters(field, errors.maximumCharacter, 50)
    } else if (checkOnlyLetter(field, errors.nonLettersInput)) {
        clearFieldError(field);
        checkOnlyLetter(field, errors.nonLettersInput)
    }
}

const validateLastName = (field, errors) => {
    if (validateEmpty(field, errors.emptyField)) {
        clearFieldError(field);
        validateEmpty(field, errors.emptyField);
    } else if (checkMinimumCharacters(field, errors.minimumCharacter, 3)) {
        clearFieldError(field);
        checkMinimumCharacters(field, errors.minimumCharacter, 3);
    } else if(checkMaximumCharacters(field, errors.maximumCharacter, 50)) {
        clearFieldError(field);
        checkMaximumCharacters(field, errors.maximumCharacter, 50)
    } else if (checkOnlyLetter(field, errors.nonLettersInput)) {
        clearFieldError(field);
        checkOnlyLetter(field, errors.nonLettersInput)
    }
}

const validateTelephoneNumber = (field, errors) => {
    if (validateEmpty(field, errors.emptyField)) {
        clearFieldError(field);
        validateEmpty(field, errors.emptyField);
    } else if (checkPhoneNumber(field, errors.invalidTelephoneNumber)) {
        clearFieldError(field);
        checkPhoneNumber(field, errors.invalidTelephoneNumber)
    }
}
navSlide();