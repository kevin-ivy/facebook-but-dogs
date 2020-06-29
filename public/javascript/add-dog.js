async function newFormHandler(event) {
    event.preventDefault();

    //MULTER added profile pic
    const profilePic = document.querySelector('input[name="profile_pic"]').value;
    const name = document.querySelector('input[name="name"]').value;
    const age = document.querySelector('input[name="age"]').value;
    const gender = document.querySelector('input[name="gender"]').value;
    const breed = document.querySelector('input[name="breed"]').value;
    const about = document.querySelector('input[name="about"]').value;

    const response = await fetch(`/api/dogs`, {
    method: 'POST',
    body: JSON.stringify({
        profilePic, //MULTER added profile pic
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
    document.location.replace('/dashboard');
    } else {
    alert(response.statusText);
    }
}

document.querySelector('.new-dog-form').addEventListener('submit', newFormHandler);