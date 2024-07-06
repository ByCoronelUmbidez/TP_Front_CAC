// document.addEventListener('DOMContentLoaded', function() {
//     const especialidadSelect = document.getElementById('especialidad');
//     const profesionalSelect = document.getElementById('profesional');
//     const horarioSelect = document.getElementById('horario');
//     const sedeSelect = document.getElementById('sede');
//     const form = document.getElementById('formularioTurnos');

//     cargarEspecialidades(); // Cargar las especialidades al cargar la página

//     especialidadSelect.addEventListener('change', function() {
//         const selectedEspecialidad = especialidadSelect.value;
//         console.log('Especialidad seleccionada:', selectedEspecialidad);
        
//         if (selectedEspecialidad) {
//             cargarProfesionales(selectedEspecialidad);
//             profesionalSelect.disabled = false;
//             horarioSelect.disabled = true; // Deshabilitar horario hasta que se seleccione un profesional
//             resetHorarios();
//             resetSedes();
//         } else {
//             resetProfesionales();
//         }
//     });
    
//     profesionalSelect.addEventListener('change', async function() {
//         try {
//             const selectedProfesionalId = await obtenerIdPorNombre('profesionales', profesionalSelect.value);
//             console.log('Profesional seleccionado (ID):', selectedProfesionalId);
            
//             if (selectedProfesionalId) {
//                 cargarHorarios(selectedProfesionalId);
//                 horarioSelect.disabled = false;
//                 resetSedes();
//             } else {
//                 resetHorarios();
//             }
//         } catch (error) {
//             console.error('Error al obtener el ID del profesional:', error);
//         }
//     });
    
//     horarioSelect.addEventListener('change', function() {
//         const selectedHorarioId = horarioSelect.value;
//         console.log('Horario seleccionado (ID):', selectedHorarioId);
        
//         if (selectedHorarioId) {
//             cargarSedes(); // Cargar sedes solo después de seleccionar horario
//             sedeSelect.disabled = false;
//         } else {
//             resetSedes();
//         }
//     });

//     function cargarEspecialidades() {
//         fetch('http://127.0.0.1:5000/api/especialidades')
//             .then(response => response.json())
//             .then(data => {
//                 especialidadSelect.innerHTML = '<option value="">Selecciona una especialidad</option>';
//                 data.forEach(especialidad => {
//                     const option = document.createElement('option');
//                     option.textContent = especialidad;
//                     option.value = especialidad;
//                     especialidadSelect.appendChild(option);
//                 });
//                 especialidadSelect.disabled = false;
//             })
//             .catch(error => console.error('Error al cargar especialidades:', error));
//     }

//     function cargarProfesionales(especialidad) {
//         fetch(`http://127.0.0.1:5000/api/profesionales/${encodeURIComponent(especialidad)}`)
//             .then(response => response.json())
//             .then(data => {
//                 profesionalSelect.innerHTML = '<option value="">Selecciona un profesional</option>';
//                 data.forEach(profesional => {
//                     const option = document.createElement('option');
//                     option.textContent = profesional.nombre;
//                     option.value = profesional.nombre; // Usar el nombre como valor
//                     profesionalSelect.appendChild(option);
//                 });
//                 profesionalSelect.disabled = false;
//             })
//             .catch(error => console.error('Error al cargar profesionales:', error));
//     }

//     function cargarHorarios(especialidad) {
//         fetch(`http://127.0.0.1:5000/api/horarios/${encodeURIComponent(especialidad)}`)
//             .then(response => response.json())
//             .then(data => {
//                 console.log('Datos recibidos del servidor:', data); // Agrega console.log para depuración
//                 // Limpiar select antes de agregar nuevos horarios
//                 horarioSelect.innerHTML = '<option value="">Selecciona un horario</option>';

//                 // Verificar si hay datos recibidos y agregar opciones al selector
//                 if (data.length > 0) {
//                     // Iterar sobre los datos recibidos y agregar opciones al select
//                     data.forEach(horario => {
//                         const option = document.createElement('option');
//                         option.textContent = horario.horario; // Solo el horario
//                         option.value = horario.id;
//                         horarioSelect.appendChild(option);
//                     });
//                     horarioSelect.disabled = false; // Habilitar selector de horarios
//                 } else {
//                     // Si no hay horarios disponibles, deshabilitar selector
//                     horarioSelect.disabled = true;
//                     console.log('No se encontraron horarios para la especialidad seleccionada.');
//                 }
//             })
//             .catch(error => console.error('Error al cargar horarios:', error));
//     }

//     function cargarSedes() {
//         fetch('http://127.0.0.1:5000/api/sedes')
//             .then(response => response.json())
//             .then(data => {
//                 sedeSelect.innerHTML = '<option value="">Selecciona una sede</option>';
//                 data.forEach(sede => {
//                     const option = document.createElement('option');
//                     option.textContent = sede.nombre;
//                     option.value = sede.id;
//                     sedeSelect.appendChild(option);
//                 });
//                 sedeSelect.disabled = false;
//             })
//             .catch(error => console.error('Error al cargar sedes:', error));
//     }

//     function resetProfesionales() {
//         profesionalSelect.innerHTML = '<option value="">Selecciona un profesional</option>';
//         profesionalSelect.disabled = true;
//         resetHorarios();
//         resetSedes();
//     }

//     function resetHorarios() {
//         horarioSelect.innerHTML = '<option value="">Selecciona un horario</option>';
//         horarioSelect.disabled = true;
//         resetSedes();
//     }

//     function resetSedes() {
//         sedeSelect.innerHTML = '<option value="">Selecciona una sede</option>';
//         sedeSelect.disabled = true;
//     }

//     document.querySelector('#guardarTurnoButton').addEventListener('click', async function (event) {
//         event.preventDefault();

//     function obtenerIdUsuario(username) {
//         return fetch(`http://127.0.0.1:5000/api/usuarios/nombre/${encodeURIComponent(username)}`)
//             .then(response => response.json())
//             .then(data => {
//                 if (data && data.id) {
//                     return data.id;
//                 } else {
//                     throw new Error(`Usuario no encontrado: ${username}`);
//                 }
//             })
//             .catch(error => {
//                 console.error('Error al obtener el ID del usuario:', error);
//                 throw error;
//             });
//     }


//         try {
//             const selectedProfesionalId = await obtenerIdPorNombre('profesionales', profesionalSelect.value);
//             const selectedSedeId = sedeSelect.value;
//             const idUsuario = obtenerIdUsuario(); // Implementa esta función para obtener el id del usuario seleccionado

//             if (selectedProfesionalId && selectedSedeId && idUsuario) {
//                 await guardarTurno(selectedProfesionalId, selectedSedeId, idUsuario);
//             } else {
//                 console.error('Faltan campos por completar.');
//             }
//         } catch (error) {
//             console.error('Error al procesar el formulario:', error);
//         }
//     });

//     async function guardarTurno(idProfesional, idSede, idUsuario) {
//         const formData = new FormData();
//         formData.append('id_profesional', idProfesional);
//         formData.append('id_sede', idSede);
//         formData.append('id_usuario', idUsuario);

//         const response = await fetch('http://127.0.0.1:5000/api/guardar_turno', {
//             method: 'POST',
//             body: formData
//         });

//         if (!response.ok) {
//             throw new Error('Error al guardar el turno');
//         }

//         const data = await response.json();
//         console.log('Turno guardado:', data);
//     }

//     async function obtenerIdPorNombre(tabla, nombre) {
//         try {
//             const response = await fetch(`http://127.0.0.1:5000/api/${tabla}/nombre/${encodeURIComponent(nombre)}`);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             if (data.length > 0) {
//                 return data[0].id; // Suponiendo que el ID del profesional está en la primera posición del array
//             } else {
//                 throw new Error('Profesional no encontrado');
//             }
//         } catch (error) {
//             throw new Error(`Error al obtener el ID de ${tabla} por nombre "${nombre}": ${error.message}`);
//         }
//     }
// });

document.addEventListener('DOMContentLoaded', function() {
    const especialidadSelect = document.getElementById('especialidad');
    const profesionalSelect = document.getElementById('profesional');
    const horarioSelect = document.getElementById('horario');
    const sedeSelect = document.getElementById('sede');
    const form = document.getElementById('formularioTurnos');

    cargarEspecialidades(); // Cargar las especialidades al cargar la página

    especialidadSelect.addEventListener('change', function() {
        const selectedEspecialidad = especialidadSelect.value;
        console.log('Especialidad seleccionada:', selectedEspecialidad);

        if (selectedEspecialidad) {
            cargarProfesionales(selectedEspecialidad);
            profesionalSelect.disabled = false;
            horarioSelect.disabled = true; // Deshabilitar horario hasta que se seleccione un profesional
            resetHorarios();
            resetSedes();
        } else {
            resetProfesionales();
        }
    });

    profesionalSelect.addEventListener('change', async function() {
        try {
            const selectedProfesionalId = await obtenerIdPorNombre('profesionales', profesionalSelect.value);
            console.log('Profesional seleccionado (ID):', selectedProfesionalId);

            if (selectedProfesionalId) {
                cargarHorarios(selectedProfesionalId);
                horarioSelect.disabled = false;
                resetSedes();
            } else {
                resetHorarios();
            }
        } catch (error) {
            console.error('Error al obtener el ID del profesional:', error);
        }
    });

    horarioSelect.addEventListener('change', function() {
        const selectedHorarioId = horarioSelect.value;
        console.log('Horario seleccionado (ID):', selectedHorarioId);

        if (selectedHorarioId) {
            cargarSedes(); // Cargar sedes solo después de seleccionar horario
            sedeSelect.disabled = false;
        } else {
            resetSedes();
        }
    });

    function cargarEspecialidades() {
        fetch('http://127.0.0.1:5000/api/especialidades')
            .then(response => response.json())
            .then(data => {
                especialidadSelect.innerHTML = '<option value="">Selecciona una especialidad</option>';
                data.forEach(especialidad => {
                    const option = document.createElement('option');
                    option.textContent = especialidad;
                    option.value = especialidad;
                    especialidadSelect.appendChild(option);
                });
                especialidadSelect.disabled = false;
            })
            .catch(error => console.error('Error al cargar especialidades:', error));
    }

    function cargarProfesionales(especialidad) {
        fetch(`http://127.0.0.1:5000/api/profesionales/${encodeURIComponent(especialidad)}`)
            .then(response => response.json())
            .then(data => {
                profesionalSelect.innerHTML = '<option value="">Selecciona un profesional</option>';
                data.forEach(profesional => {
                    const option = document.createElement('option');
                    option.textContent = profesional.nombre;
                    option.value = profesional.nombre; // Usar el nombre como valor
                    profesionalSelect.appendChild(option);
                });
                profesionalSelect.disabled = false;
            })
            .catch(error => console.error('Error al cargar profesionales:', error));
    }

    function cargarHorarios(profesionalId) {
        fetch(`http://127.0.0.1:5000/api/horarios/${encodeURIComponent(profesionalId)}`)
            .then(response => response.json())
            .then(data => {
                console.log('Datos recibidos del servidor:', data); // Agrega console.log para depuración
                // Limpiar select antes de agregar nuevos horarios
                horarioSelect.innerHTML = '<option value="">Selecciona un horario</option>';

                // Verificar si hay datos recibidos y agregar opciones al selector
                if (data.length > 0) {
                    // Iterar sobre los datos recibidos y agregar opciones al select
                    data.forEach(horario => {
                        const option = document.createElement('option');
                        option.textContent = horario.horario; // Solo el horario
                        option.value = horario.id;
                        horarioSelect.appendChild(option);
                    });
                    horarioSelect.disabled = false; // Habilitar selector de horarios
                } else {
                    // Si no hay horarios disponibles, deshabilitar selector
                    horarioSelect.disabled = true;
                    console.log('No se encontraron horarios para la especialidad seleccionada.');
                }
            })
            .catch(error => console.error('Error al cargar horarios:', error));
    }

    function cargarSedes() {
        fetch('http://127.0.0.1:5000/api/sedes')
            .then(response => response.json())
            .then(data => {
                sedeSelect.innerHTML = '<option value="">Selecciona una sede</option>';
                data.forEach(sede => {
                    const option = document.createElement('option');
                    option.textContent = sede.nombre;
                    option.value = sede.id;
                    sedeSelect.appendChild(option);
                });
                sedeSelect.disabled = false;
            })
            .catch(error => console.error('Error al cargar sedes:', error));
    }

    function resetProfesionales() {
        profesionalSelect.innerHTML = '<option value="">Selecciona un profesional</option>';
        profesionalSelect.disabled = true;
        resetHorarios();
        resetSedes();
    }

    function resetHorarios() {
        horarioSelect.innerHTML = '<option value="">Selecciona un horario</option>';
        horarioSelect.disabled = true;
        resetSedes();
    }

    function resetSedes() {
        sedeSelect.innerHTML = '<option value="">Selecciona una sede</option>';
        sedeSelect.disabled = true;
    }

    document.querySelector('#guardarTurnoButton').addEventListener('click', async function(event) {
        event.preventDefault();

        try {
            const selectedProfesionalId = await obtenerIdPorNombre('profesionales', profesionalSelect.value);
            const selectedSedeId = sedeSelect.value;
            const idUsuario = await obtenerIdUsuario(); // Implementa esta función para obtener el id del usuario seleccionado

            if (selectedProfesionalId && selectedSedeId && idUsuario) {
                await guardarTurno(selectedProfesionalId, selectedSedeId, idUsuario);
            } else {
                console.error('Faltan campos por completar.');
            }
        } catch (error) {
            console.error('Error al procesar el formulario:', error);
        }
    });

    async function guardarTurno(idProfesional, idSede, idUsuario) {
        try {
            const idUsuario = await obtenerIdUsuario();
            const formData = new FormData();
            formData.append('id_profesional', idProfesional);
            formData.append('id_sede', idSede);
            formData.append('id_usuario', idUsuario);
    
            const response = await fetch('http://127.0.0.1:5000/api/guardar_turno', {
                method: 'POST',
                body: formData
            });
    
            if (!response.ok) {
                throw new Error('Error al guardar el turno');
            }
    
            const data = await response.json();
            console.log('Turno guardado:', data);
        } catch (error) {
            console.error('Error al procesar el formulario:', error);
        }
    }

    async function obtenerIdPorNombre(tabla, nombre) {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/${tabla}/nombre/${encodeURIComponent(nombre)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.length > 0) {
                return data[0].id; // Suponiendo que el ID del profesional está en la primera posición del array
            } else {
                throw new Error('Profesional no encontrado');
            }
        } catch (error) {
            throw new Error(`Error al obtener el ID de ${tabla} por nombre "${nombre}": ${error.message}`);
        }
    }

    async function obtenerIdUsuario() {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/perfil');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.id; // Suponiendo que el ID del usuario está disponible en la respuesta
        } catch (error) {
            console.error('Error al obtener el ID del usuario:', error);
            throw error;
        }
    }
});