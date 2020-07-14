async function upboneClickHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/dogs/upbone', {
        method: 'PUT',
        body: JSON.stringify({
            dog_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (response.ok) {
    document.location.reload();
    } else {
    alert(response.statusText);
    }
}
 
document.querySelector('.upbone-btn').addEventListener('click', upboneClickHandler);