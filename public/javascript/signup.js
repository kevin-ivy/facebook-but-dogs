async function signupFormHandler(event) {
    event.preventDefault();

const username = document.querySelector('#username-signup').value.trim();
const location = document.querySelector('#location-signup').value.trim();
const email = document.querySelector('#email-signup').value.trim();
const password = document.querySelector('#password-signup').value.trim();

if (username && location&& email && password) {
    const response = await fetch('/api/users', {
    method: 'post',
    body: JSON.stringify({
        username,
        location,
        email,
        password
    }),
    headers: { 'Content-Type': 'application/json' }
    });
    // check the response status
    if (response.ok) {
        console.log('success');
        document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}
// disables form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false);
    });
}, false);
})();
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);