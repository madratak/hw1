function jsonCheckUsername(json, event) {
    if (!json.exists) {
        document.querySelector('.username span').classList.add('hidden');
    } else {
        document.querySelector('.username span').textContent = "Username non disponibile!";
        document.querySelector('.username span').classList.remove('hidden');
        event.preventDefault();
    }
}

function jsonCheckMail(json, event){
    if (!json.exists) {
        document.querySelector('.mail span').classList.add('hidden');
    } else {
        document.querySelector('.mail span').textContent = "Mail già utilizzata";
        document.querySelector('.mail span').classList.remove('hidden');
        event.preventDefault();
    }
}

function onResponse (response){
        return response.json();
}

function checkUsername(event){
    const inputUsername = document.querySelector('.username input');
    if(!/^[a-zA-Z0-9_]{1,15}$/.test(inputUsername.value)){
        inputUsername.parentNode.parentNode.querySelector('span').textContent = "Sono ammesse lettere, numeri e underscore. Max: 15";
        inputUsername.parentNode.parentNode.querySelector('span').classList.remove('hidden');
        event.preventDefault();
    } else{
        fetch("check_username.php?q="+encodeURIComponent(inputUsername.value)).then(onResponse).then(jsonCheckUsername);
    }
}

function checkMail(event){
    const inputMail = document.querySelector('.mail input');
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(inputMail.value).toLowerCase())) {
        inputMail.parentNode.parentNode.querySelector('span').textContent = "Mail non valida";
        inputMail.parentNode.parentNode.querySelector('span').classList.remove('hidden');
        event.preventDefault();
    } else {
        fetch("check_mail.php?q="+encodeURIComponent(inputMail.value)).then(onResponse).then(jsonCheckMail);
    }
}

function checkPassword(event){
    const inputCheckPassword = document.querySelector('.password input');
    if(inputCheckPassword.value.length >= 8){
        inputCheckPassword.parentNode.parentNode.querySelector('span').classList.add('hidden');
    } else{
        inputCheckPassword.parentNode.parentNode.querySelector('span').classList.remove('hidden');
        event.preventDefault();
    }
}

function checkConfirmPassword(event){
    const inputCheckConfirmPassword = document.querySelector('.c_password input');
    if(inputCheckConfirmPassword.value===document.querySelector('.password input').value){
        inputCheckConfirmPassword.parentNode.parentNode.querySelector('span').classList.add('hidden');
    } else {
        inputCheckConfirmPassword.parentNode.parentNode.querySelector('span').classList.remove('hidden');
        event.preventDefault();
    }
}

document.querySelector('.username input').addEventListener('blur',checkUsername);
document.querySelector('.mail input').addEventListener('blur', checkMail);
document.querySelector('.password input').addEventListener('blur', checkPassword);
document.querySelector('.c_password input').addEventListener('blur', checkConfirmPassword);