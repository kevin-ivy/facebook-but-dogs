/*async function editFormHandler(event) {
    
    event.preventDefault();
    
    const name = document.querySelector('input[name="name"]').value;
    const age = document.querySelector('input[name="age"]').value;
    const gender = document.querySelector('input[name="gender"]').value;
    const breed = document.querySelector('input[name="breed"]').value;
    const about = document.querySelector('input[name="about"]').value;
    const dogImage = document.querySelector('input[name="dogImage"]').value;

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
            about, 
            dogImage
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

document.querySelector('.edit-dog-form').addEventListener('submit', editFormHandler);*/


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
if (dogImage) {
    console.log ("file exists")
} else {
    console.log("no file")
}
formElem.onsubmit = async (e) => {
    e.preventDefault();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    let response = await fetch(`/api/dogs/${id}`, {
        method: 'PUT',
        body: new FormData(formElem),
    });


    if (response.ok) {
        document.location.replace('/dashboard');
        } else {
        alert(response.statusText);
        }
};