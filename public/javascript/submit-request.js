async function requestFormHandler(event) {
    event.preventDefault();

    const date_text = document.querySelector('textarea[name="request-body"]').value.trim();

    const location = document.querySelector('#date-location').value.trim();

    const dog_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 2
    ];

    if (date_text) {
        const response = await fetch('/api/dates', {
            method: 'POST',
            body: JSON.stringify({
                date_text,
                location,
                dog_id
                
            }),
            headers: {
            'Content-Type': 'application/json'
            }
        });
    
        if (response.ok) {
            window.alert('Play Date Submitted!');
            document.location.replace(`/dog/${dog_id}`);
        } else {
            alert(response.statusText);
        }
    }

};
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
document.querySelector('.request-form').addEventListener('submit', requestFormHandler);