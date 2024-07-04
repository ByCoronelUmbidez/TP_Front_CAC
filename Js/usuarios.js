document.addEventListener('DOMContentLoaded', function () {
    fetch('http://127.0.0.1:5000/api/listar_usuarios')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#tabla-usuarios');
            if (!tableBody) {
                console.error('Table body not found');
                return;
            }
            data.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.username}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.email}</td>
                    <td>
                        <form id="eliminarForm${usuario.id}" action="http://127.0.0.1:5000/api/eliminar_usuario/${usuario.id}" method="post">
                            <input type="hidden" name="userId" value="${usuario.id}">
                            <input type="submit" value="Eliminar">
                        </form>
                    </td>
                `;
                tableBody.appendChild(row);

                // Agregar evento de submit para manejar la eliminación del usuario
                const eliminarForm = document.getElementById(`eliminarForm${usuario.id}`);
                eliminarForm.addEventListener('submit', function (event) {
                    event.preventDefault(); // Evitar el envío directo del formulario

                    fetch(this.action, {
                        method: 'POST',
                        body: new FormData(this)
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al eliminar el usuario');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Usuario eliminado correctamente', data);
                        window.location.href = 'http://127.0.0.1:5500/sitio/usuarios.html'
                    })
                    .catch(error => {
                        console.error('Error al eliminar el usuario:', error);
                    });
                });
            });
        })
        .catch(error => console.error('Error fetching user data:', error));
});