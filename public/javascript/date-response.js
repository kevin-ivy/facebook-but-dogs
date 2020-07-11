async function acceptHandler(event) {

    const id = event.name;
    const accept = true;
    const answer = true;

    const response = await fetch(`/api/dates/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            accept: accept,
            responded: answer
        }),
        headers: {
            'Content-Type':'application/json'
        }
    });

    if (response.ok) {
        location.reload();
    } else {
        alert(response.statusText);
    }
};

async function rejectHandler(event) {

    const id = event.name;
    const accept = false;
    const answer = true;

    const response = await fetch(`/api/dates/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            accept: accept,
            responded: answer
        }),
        headers: {
            'Content-Type':'application/json'
        }
    });

    if (response.ok) {
        location.reload();
    } else {
        alert(response.statusText);
    }
};