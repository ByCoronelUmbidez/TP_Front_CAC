// URL de tu API que devuelve datos de profesionales
const urlProfesionales = 'http://127.0.0.1:5000/api/profesionales';

// Función para obtener datos de la API
async function obtenerProfesionales() {
    try {
        const respuesta = await fetch(urlProfesionales);
        const datos = await respuesta.json();
        console.log('Datos de profesionales recibidos:', datos);
        mostrarProfesionales(datos);
    } catch (error) {
        console.error('Error al obtener profesionales:', error);
    }
}

// Función para mostrar los datos de profesionales en la tabla
function mostrarProfesionales(profesionales) {
    const tbodyProfesionales = document.getElementById('tbody-profesionales');

    // Limpiar contenido existente
    tbodyProfesionales.innerHTML = '';

    // Iterar sobre los profesionales y agregar filas a la tabla
    profesionales.forEach(profesional => {
        const fila = `
            <tr>
                <td>${profesional.nombre}</td>
                <td>${profesional.especialidad}</td>
                <td>${profesional.horario}</td>
            </tr>
        `;
        tbodyProfesionales.innerHTML += fila;
    });
}


// URL de tu API que devuelve datos de profesionales
const urlSedes = 'http://127.0.0.1:5000/api/sedes';

// Función para obtener datos de la API
async function obtenerSedes() {
    try {
        const respuesta = await fetch(urlSedes);
        const datos = await respuesta.json();
        console.log('Datos de sedes recibidos:', datos); // Verifica los datos recibidos
        mostrarSedes(datos);
    } catch (error) {
        console.error('Error al obtener sedes:', error);
    }
}

// Función para mostrar los datos de profesionales en la tabla
function mostrarSedes(sedes) {
    const tbodySedes = document.getElementById('tbody-sedes');

    // Limpiar contenido existente
    tbodySedes.innerHTML = '';

    // Iterar sobre los profesionales y agregar filas a la tabla
    sedes.forEach(sede => {
        const fila = `
            <tr>
                <td>${sede.nombre}</td>
                <td>${sede.direccion}</td>
                <td>${sede.horario_atencion}</td>
                <td>${sede.telefono}</td>
            </tr>
        `;
        tbodySedes.innerHTML += fila;
    });
}

// Llamar a la función para obtener y mostrar profesionales al cargar la página
window.onload = () => {
    obtenerProfesionales();
    obtenerSedes();
};