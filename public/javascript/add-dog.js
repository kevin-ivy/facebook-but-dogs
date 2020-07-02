/*async function newFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const age = document.querySelector('input[name="age"]').value;
    const gender = document.querySelector('input[name="gender"]').value;
    const breed = document.querySelector('input[name="breed"]').value;
    const about = document.querySelector('input[name="about"]').value;
    const dogImage = document.getElementById("dogImage").value;

    const response = await fetch(`/api/dogs`, {
    method: 'POST',
    body: JSON.stringify({
        name,
        age,
        gender,
        breed,
        about,
        //dogImage
    })
    //headers: {
        //'Content-Type': 'application/json'
        //'Content-Type': 'multipart/form-data'
    //}
    });

    if (response.ok) {
    document.location.replace('/dashboard');
    } else {
    alert(response.statusText);
    }
}
document.querySelector('.new-dog-form').addEventListener('submit', newFormHandler);*/
// preview image selected to upload
async function previewFile() {
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      // convert image file to base64 string
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}
formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/api/dogs', {
        method: 'POST',
        body: new FormData(formElem)
    });


    if (response.ok) {
        document.location.replace('/dashboard');
        } else {
        alert(response.statusText);
        }
};