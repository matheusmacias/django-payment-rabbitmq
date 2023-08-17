function toggleSubmitButton(loading) {
    const submitButton = document.getElementById('submit-btn');
    const buttonText = document.querySelector('.button-text');
    const spinner = document.querySelector('.spinner-border-custom');

    submitButton.disabled = loading;
    buttonText.style.display = loading ? 'none' : 'inline';
    spinner.style.display = loading ? 'inline-block' : 'none';
}

function encryptAndSubmit(event) {

    const form = document.getElementById('payment-form');

    var cardData = {
        publicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr+ZqgD892U9/HXsa7XqBZUayPquAfh9xx4iwUbTSUAvTlmiXFQNTp0Bvt/5vK2FhMj39qSv1zi2OuBjvW38q1E374nzx6NNBL5JosV0+SDINTlCG0cmigHuBOyWzYmjgca+mtQu4WczCaApNaSuVqgb8u7Bd9GCOL4YJotvV5+81frlSwQXralhwRzGhj/A57CGPgGKiuPT+AOGmykIGEZsSD9RKkyoKIoc0OS8CPIzdBOtTQCIwrLn2FxI83Clcg55W8gkFSOS6rWNbG5qFZWMll6yl02HtunalHmUlRUL66YeGXdMDC2PuRcmZbGO5a/2tbVppW6mfSWG3NPRpgwIDAQAB",
        holder: document.querySelector("#cardholder-name").value,
        number: document.querySelector("#card-number-input").value.replace(/\s/g, ''),
        expMonth: document.querySelector("#expiry-date-input").value.split('/')[0].trim(),
        expYear: '20' + document.querySelector("#expiry-date-input").value.split('/')[1].trim(),
        securityCode: document.querySelector("#cvv").value
    };
    toggleSubmitButton(true);
    var card = PagSeguro.encryptCard(cardData);

    if (card.hasErrors) {
        alert("Erro durante o processo do cartão de crédito.");
        console.error("Erro durante o processo de criptografia:");
        console.error(card.errors);
        toggleSubmitButton(false); // Enable the submit button and hide loading spinner
    } else {
        console.log("Cartão criptografado:");
        console.log(card.encryptedCard);

        var encryptedField = form.querySelector('input[name="encrypted_card"]');

        if (!encryptedField) {
            encryptedField = document.createElement("input");
            encryptedField.type = "hidden";
            encryptedField.name = "encrypted_card";
            form.appendChild(encryptedField);
        }

        encryptedField.value = card.encryptedCard;

        form.submit();
    }
}


function handleFormSubmission(event) {
    event.preventDefault();
    const form = document.getElementById('payment-form');
    const selectedOption = document.querySelector('input[name="fav_language"]:checked');
    if (selectedOption && (selectedOption.value === "credit_card" || selectedOption.value === "debit_card")) {
        encryptAndSubmit(event);

    }else{
        form.submit();
    }
}