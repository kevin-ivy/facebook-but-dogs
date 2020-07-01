async function newFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const age = document.querySelector('input[name="age"]').value;
    const gender = document.querySelector('input[name="gender"]').value;
    const breed = document.querySelector('input[name="breed"]').value;
    const about = document.querySelector('input[name="about"]').value;
    const dogImage = document.querySelector('input[name="dogImage"]').value;


    const response = await fetch(`/api/dogs`, {
    method: 'POST',
    body: JSON.stringify({
        name,
        age,
        gender,
        breed,
        about,
        dogImage
    }),
    headers: {
        'Content-Type': 'application/json'
    }
    });

    if (response.ok) {
    document.location.replace('/dashboard');
    } else {
    alert(response.statusText);
    }
}

document.querySelector('.new-dog-form').addEventListener('submit', newFormHandler);