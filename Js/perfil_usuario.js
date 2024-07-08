document.addEventListener('DOMContentLoaded', function () {
    fetch('http://127.0.0.1:5000/api/perfil', {
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
        if (data && data.mensaje === 'Usuario no encontrado') {
            alert('Usuario no encontrado');
            window.location.href = '/path/to/your/login.html';
            return;
        }

        const perfilUsuario = document.getElementById('perfil-usuario');
        perfilUsuario.innerHTML = `
            <p>Nombre de Usuario: ${data.username}</p>  
            <p>Nombre: ${data.nombre}</p>
            <p>Email: ${data.email}</p>
        `;

        const tablaTurnos = document.getElementById('tabla-turnos');
        if (data.turnos && data.turnos.length > 0) {
            data.turnos.forEach(turno => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${turno.id}</td>
                    <td>${turno.fecha}</td>
                    <td>${turno.hora}</td>
                    <td>${turno.especialidad}</td>
                    <td>${turno.doctor}</td>
                `;
                tablaTurnos.appendChild(row);
            });
        } else {
            tablaTurnos.innerHTML = '<tr><td colspan="5">No hay turnos registrados.</td></tr>';
        }
    })
    .catch(error => {
        console.error('Error fetching profile data:', error);
        alert('Error al obtener perfil de usuario. Por favor, inténtalo nuevamente más tarde.');
    });
});