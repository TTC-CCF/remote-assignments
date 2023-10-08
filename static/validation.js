var nameElement = document.querySelector('#name');
var emailElement = document.querySelector('#email');
var passwordElement = document.querySelector('#password');

nameElement.addEventListener('input', function () {
    if (nameElement.validity.patternMismatch) {
        nameElement.setCustomValidity('不支援的字元');
    } else {
        nameElement.setCustomValidity('');
    }
});

emailElement.addEventListener('input', function () {
    if (emailElement.validity.typeMismatch) {
        emailElement.setCustomValidity('必須是 email 格式');
    } else {
        emailElement.setCustomValidity('');
    }
});

passwordElement.addEventListener('input', function () {
    if (passwordElement.validity.patternMismatch) {
        passwordElement.setCustomValidity('必須包含8個字元以上，並包含大、小寫英文、數字、特殊字元其中三種');
    } else {
        passwordElement.setCustomValidity('');
    }
});