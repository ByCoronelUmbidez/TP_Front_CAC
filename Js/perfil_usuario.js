document.addEventListener('DOMContentLoaded', function () {
    fetch('http://127.0.0.1:5000/api/perfil', {
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje === 'Usuario no encontrado') {
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
    })
    .catch(error => console.error('Error fetching profile data:', error));
});