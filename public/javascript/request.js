async function openRequestWindow(event) {
    event.preventDefault(); 
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const url = window.location.toString().split('/');
    console.log(url);

    const response = await fetch(`/dog/${id}/request-date`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace(`/dog/${id}/request-date`);
    } else {
        alert(response.statusText);
    }

  };

  document.querySelector('#request-date').addEventListener('click', openRequestWindow);