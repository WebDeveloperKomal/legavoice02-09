// -----------------------------save the data----------------------------------------

// Add an event listener to the form submission
document.getElementById('commentform').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Call the saveData function when the form is submitted
    saveData();
});

// JavaScript function to save data
function saveData() {
    var comment = document.getElementById('comment').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var website = document.getElementById('website').value;

    // Validate form fields
    if (!comment || !name || !email || !website) {
        alert('Please fill in all required fields.');
        return;
    }

    var data = {
        comment: comment,
        name: name,
        email: email,
        website: website
    };

    // Your fetch request and data handling logic can go here
    // Make sure to adjust the fetch request according to your needs
    // Example:

    fetch('http://localhost:8181/legavoice/auth/save-reply', {
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
                document.getElementById('comment').value = '';
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('website').value = '';
                window.location.href = 'blogs.html';
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
