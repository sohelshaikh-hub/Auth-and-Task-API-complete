// MODIFIED LOGIN FUNCTION
async function login() {
    const response = await fetch('/api/v1/auth/login', { /* ... your fetch config ... */ });
    const data = await response.json();

    if (data.token) {
        // SAVE THE TOKEN (Required for protected routes )
        localStorage.setItem('jwt_token', data.token);
        alert("Logged in successfully!");
    }
}

// MODIFIED ADMIN CALL
async function callAdminOnly() {
    const token = localStorage.getItem('jwt_token');

    if (!token) {
        alert("You must login first.");
        return;
    }

    const response = await fetch('/api/v1/auth/admin-only', {
        method: 'GET',
        headers: {
            // SEND THE TOKEN (This is how the backend knows who you are )
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    document.getElementById('admin-result').innerText = data.message;
}