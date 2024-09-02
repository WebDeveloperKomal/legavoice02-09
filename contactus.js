// -----------------------------save the data---------------------------------------


function saveData() {
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var details = document.getElementById('details').value;

    // Check if any field is empty
    if (!firstName || !lastName || !email || !phoneNumber || !details) {
        alert('Please fill in all required fields.');
        return;
    }

    var data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        details: details
    };

    fetch('http://localhost:8181/legavoice/auth/save-contact', {
        method: 'POST', // Ensure it's a POST request
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Server responded with error ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Server response:', data);
            Swal.fire({
                icon: 'success',
                title: 'Saved!',
                text: 'Data has been saved successfully.',
            }).then((result) => {
                // Clear form fields and redirect if necessary
                document.getElementById('firstName').value = '';
                document.getElementById('lastName').value = '';
                document.getElementById('email').value = '';
                document.getElementById('phoneNumber').value = '';
                document.getElementById('details').value = '';

                // Redirect to another page
                window.location.href = 'Legavoice1-master/contactUs.html';
            });
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to save data. Please try again.',
            });
        });
}


// -----------------------------------------------------------------------------------------------