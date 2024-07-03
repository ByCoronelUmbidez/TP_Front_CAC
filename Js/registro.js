const registroForm = document.getElementById('registroForm');

registroForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('http://localhost:5000/api/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, nombre, email })
        });

        if (!response.ok) {
            throw new Error('Error al registrar usuario');
        }

        const data = await response.json();
        console.log('Registro exitoso', data);
        // Aquí podrías redirigir al usuario a una página de éxito de registro
        window.location.href = '../sitio/login.html'; // Cambia esto según tu estructura de rutas
    } catch (error) {
        console.error('Error:', error.message);
        // Aquí podrías mostrar un mensaje de error al usuario
        alert('Error al registrar usuario. Por favor, intenta nuevamente.');
    }
});