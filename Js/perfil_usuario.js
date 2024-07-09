document.addEventListener('DOMContentLoaded', function () {
    fetch('https://barbycoronelumbidez.pythonanywhere.com/api/perfil', {
        method: 'GET',  // Método de la solicitud (GET, POST, etc.)
        credentials: 'include'  // Incluir credenciales en la solicitud (cookies)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener perfil de usuario');
        }
        return response.json();
    })
    .then(data => {
        if (data && data.message === 'Usuario no autenticado') {
            alert('Usuario no autenticado');
            window.location.href = '/path/to/your/login.html';  // Redirigir a la página de inicio de sesión
            return;
        }

        // Mostrar información del perfil del usuario
        const perfilUsuario = document.getElementById('perfil-usuario');
        perfilUsuario.innerHTML = `
            <p>Nombre de Usuario: ${data.username}</p>
            <p>Nombre: ${data.nombre}</p>
            <p>Email: ${data.email}</p>
        `;

        // Mostrar los turnos del usuario en una tabla
        const tablaTurnos = document.getElementById('tabla-turnos');
        if (data.turnos && data.turnos.length > 0) {
            data.turnos.forEach(turno => {
                const row = document.createElement('tr');
                row.innerHTML = `

                    <td>${turno.fecha_hora}</td>  
                    <td>${turno.profesional}</td>  
                    <td>${turno.sede}</td>  
                    <td>${turno.especialidad}</td>
                `;
                tablaTurnos.appendChild(row);
            });
        } else {
            tablaTurnos.innerHTML = '<tr><td colspan="4">No hay turnos registrados.</td></tr>';
        }
    })
    .catch(error => {
        console.error('Error fetching profile data:', error);
        alert('Error al obtener perfil de usuario. Por favor, inicie sesión.');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const cerrarSesionBtn = document.getElementById('cerrar-sesion-btn');

    cerrarSesionBtn.addEventListener('click', function(event) {
        event.preventDefault();

        fetch('https://barbycoronelumbidez.pythonanywhere.com/api/logout', {
            method: 'POST',
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cerrar sesión');
            }
            return response.json();
        })
        .then(data => {
            // Redirigir al usuario al index.html u otra página de inicio del frontend
            window.location.href = '/index.html'; // Aquí ajusta la URL según sea necesario
        })
        .catch(error => {
            console.error('Error al cerrar sesión:', error);
            alert('Error al cerrar sesión. Por favor, inténtalo nuevamente más tarde.');
        });
    });
});