const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Error al iniciar sesión');
        }

        const data = await response.json();
        // Aquí puedes manejar la respuesta del backend, por ejemplo, redirigir al usuario a otra página
        console.log('Inicio de sesión exitoso', data);
        // Ejemplo de redirección
        window.location.href = '../index.html'; // Cambia esto según tu estructura de rutas
    } catch (error) {
        console.error('Error:', error.message);
        // Aquí puedes mostrar un mensaje de error al usuario
        alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
});