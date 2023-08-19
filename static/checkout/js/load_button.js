function toggleSubmitButton(loading) {
    /*
    * @param {boolean} loading - If true, the button will be disabled and the spinner will be shown.
    */
    const submitButton = document.getElementById('submit-btn');
    const buttonText = document.querySelector('.button-text');
    const spinner = document.querySelector('.spinner-border-custom');

    submitButton.disabled = loading;
    buttonText.style.display = loading ? 'none' : 'inline';
    spinner.style.display = loading ? 'inline-block' : 'none';
}
