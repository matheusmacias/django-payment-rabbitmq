function selectOption(option) {
    var labels = document.querySelectorAll('label');
    labels.forEach(function (label) {
        label.classList.remove('btn-primary');
        label.classList.remove('selected');
    });

    var selectedLabel = document.querySelector('label[for="' + option + '"]');
    selectedLabel.classList.add('btn-primary');
    selectedLabel.classList.add('selected');
}