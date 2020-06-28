async function editFormHandler(event) {
    
    event.preventDefault();
    
    const name = document.querySelector('input[name="name"]').value;
    const age = document.querySelector('input[name="age"]').value;
    const gender = document.querySelector('input[name="gender"]').value;
    const breed = document.querySelector('input[name="breed"]').value;
    const about = document.querySelector('input[name="about"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/dogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            age,
            gender,
            breed,
            about
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-dog-form').addEventListener('submit', editFormHandler);