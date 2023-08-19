const form = document.getElementById('payment-form');
form.addEventListener('submit', async function (event) {
    event.preventDefault();
    toggleSubmitButton(true);
    const data_form = {
        holder: document.querySelector("#cardholder-name").value,
        number: document.querySelector("#card-number-input").value.replace(/\s/g, ''),
        expMonth: document.querySelector("#expiry-date-input").value.split('/')[0].trim(),
        expYear: '20' + document.querySelector("#expiry-date-input").value.split('/')[1].trim(),
        securityCode: document.querySelector("#cvv").value
    }
    try {
        let result = await getCard(
            data_form.holder,
            data_form.number,
            data_form.expMonth,
            data_form.expYear,
            data_form.securityCode
        )
        console.log(result)
        if (!result) {
            throw new Error('Error in getCard');

        }
        var encryptedField = form.querySelector('input[name="encrypted_card"]');
        if (!encryptedField) {
            encryptedField = document.createElement("input");
            encryptedField.type = "hidden";
            encryptedField.name = "encrypted_card";
            form.appendChild(encryptedField);
        }
        encryptedField.value = result;
        form.submit();
    } catch (e) {
        toggleSubmitButton(false)
        console.log(e)
    }
});