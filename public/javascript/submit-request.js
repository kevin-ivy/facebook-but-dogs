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

document.querySelector('#submit-request').addEventListener('click', requestFormHandler);