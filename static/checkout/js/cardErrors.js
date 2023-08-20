const cardNumberInput = document.getElementById('card-number-input');
const expiryDateInput = document.getElementById('expiry-date-input');
const cvvInput = document.getElementById('cvv');
const errorCardNumber = document.getElementById('error-card-number');
const errorExpiryDate = document.getElementById('error-card-date');
const errorCvv = document.getElementById('error-card-cvv');

function setErrorCardNumber() {
    cardNumberInput.style.border = '1px solid rgba(255, 0, 0, 0.5)';
    errorCardNumber.innerHTML = 'Número de cartão inválido';
}

function setErrorExpiryDate() {
    expiryDateInput.style.border = '1px solid rgba(255, 0, 0, 0.5)';
    errorExpiryDate.innerHTML = 'Data de expiração inválida';
}

function setErrorCvv() {
    cvvInput.style.border = '1px solid rgba(255, 0, 0, 0.5)';
    errorCvv.innerHTML = 'Código de segurança inválido';
}

function clearErrors() {
    cardNumberInput.style.border = '0px solid transparent';
    expiryDateInput.style.border = '0px solid transparent';
    cvvInput.style.border = '0px solid transparent';
    errorCardNumber.innerHTML = '';
    errorExpiryDate.innerHTML = '';
    errorCvv.innerHTML = '';
}