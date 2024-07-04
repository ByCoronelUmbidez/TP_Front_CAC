// URL de tu API que devuelve datos de usuarios
const urlUsuarios = 'http://127.0.0.1:5000/api/listar_usuarios';


// Función para obtener y mostrar los usuarios
async function obtenerYMostrarUsuarios() {
    try {
        const respuesta = await fetch(urlUsuarios);
        const usuarios = await respuesta.json();

        const tablaUsuarios = document.getElementById('tabla-usuarios');

        // Limpiar la tabla de usuarios antes de insertar nuevos
        tablaUsuarios.innerHTML = '';

        // Iterar sobre los usuarios recibidos y crear filas en la tabla
        usuarios.forEach(usuario => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.username}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.email}</td>
            `;

            tablaUsuarios.appendChild(fila);
        });

    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
}

// Llamar a la función para obtener y mostrar usuarios al cargar la página
window.onload = obtenerYMostrarUsuarios;