// --------------------------------save the data--------------------------------------


// Define jwtToken in a global scope or where it's accessible
var jwtToken = localStorage.getItem('jwtToken');


// Function to save data
function saveData() {
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var services = document.getElementById('services').value;
    var appointmentDate = document.getElementById('appointmentDate').value;
    var appTime = document.getElementById('appTime').value;
    var overview = document.getElementById('overview').value;


    if (!firstName || !lastName || !email || !phoneNumber || !services || !appointmentDate || !appTime || !overview) {
        alert('Please fill in all required fields.');
        return;
    }

    var data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        services: services,
        appointmentDate: appointmentDate,
        appTime: appTime,
        overview: overview,
    };

    fetch('http://localhost:8181/legavoice/auth/save-appointment', {
        method: 'POST',
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
                document.getElementById('firstName').value = '';
                document.getElementById('lastName').value = '';
                document.getElementById('email').value = '';
                document.getElementById('phoneNumber').value = '';
                document.getElementById('services').value = '';
                document.getElementById('appointmentDate').value = '';
                document.getElementById('appTime').value = '';
                document.getElementById('overview').value = '';

                window.location.href = 'index.html';
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


// --------------------------------------------------------------------------------------------