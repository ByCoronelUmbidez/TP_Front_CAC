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
            const selectedProfesional = obtenerProfesionalSeleccionado();
            if (selectedProfesional) {
                const selectedProfesionalId = selectedProfesional.id;
                console.log('ID del Profesional seleccionado:', selectedProfesionalId);

                if (selectedProfesionalId) {
                    await cargarHorarios(selectedProfesionalId);
                    horarioSelect.disabled = false;
                    resetSedes();
                } else {
                    resetHorarios();
                }
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

    async function cargarEspecialidades() {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/especialidades');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            especialidadSelect.innerHTML = '<option value="">Selecciona una especialidad</option>';
            data.forEach(especialidad => {
                const option = document.createElement('option');
                option.textContent = especialidad;
                option.value = especialidad;
                especialidadSelect.appendChild(option);
            });
            especialidadSelect.disabled = false;
        } catch (error) {
            console.error('Error al cargar especialidades:', error);
        }
    }

    async function cargarProfesionales(especialidad) {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/profesionales/${encodeURIComponent(especialidad)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Datos recibidos:', data); // Verifica qué datos se están recibiendo
            profesionalSelect.innerHTML = '<option value="">Selecciona un profesional</option>';
            data.forEach(profesional => {
                const option = document.createElement('option');
                option.textContent = profesional.nombre;
                option.value = profesional.id; // Usar el ID como valor
                profesionalSelect.appendChild(option);
            });
            profesionalSelect.disabled = false;
        } catch (error) {
            console.error('Error al cargar profesionales:', error);
        }
    }

    async function cargarHorarios(profesionalId) {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/horarios/${encodeURIComponent(profesionalId)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Datos recibidos del servidor:', data); // Agrega console.log para depuración
            horarioSelect.innerHTML = '<option value="">Selecciona un horario</option>';
            data.forEach(item => {
                const option = document.createElement('option');
                option.textContent = item.horario; // Usar el valor de la propiedad "horario"
                option.value = item.id; // Usar el valor de la propiedad "id" como valor
                horarioSelect.appendChild(option);
            });
            horarioSelect.disabled = false; // Habilitar selector de horarios
        } catch (error) {
            console.error('Error al cargar horarios:', error);
        }
    }

    async function cargarSedes() {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/sedes');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            sedeSelect.innerHTML = '<option value="">Selecciona una sede</option>';
            data.forEach(sede => {
                const option = document.createElement('option');
                option.textContent = sede[1];
                option.value = sede[0];
                sedeSelect.appendChild(option);
            });
            sedeSelect.disabled = false;
        } catch (error) {
            console.error('Error al cargar sedes:', error);
        }
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

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
    
        try {
            const selectedProfesional = obtenerProfesionalSeleccionado();
            if (selectedProfesional) {
                const selectedProfesionalId = selectedProfesional.id;
                const selectedSedeId = sedeSelect.value;
                const idUsuario = await obtenerIdUsuario(); // Obtener el ID de usuario actual
    
                console.log('Datos para enviar:', {
                    id_profesional: selectedProfesionalId,
                    id_sede: selectedSedeId,
                    id_usuario: idUsuario, // Usar el ID de usuario obtenido
                    horario: horarioSelect.options[horarioSelect.selectedIndex].textContent,
                    especialidad: especialidadSelect.value
                });
    
                if (selectedProfesionalId && selectedSedeId && idUsuario) {
                    await guardarTurno(selectedProfesionalId, selectedSedeId, idUsuario);
                } else {
                    console.error('Faltan campos por completar.');
                }
            } else {
                console.error('Debe seleccionar un profesional.');
            }
        } catch (error) {
            console.error('Error al procesar el formulario:', error);
        }
    });

    async function guardarTurno(idProfesional, idSede) {
        try {
            const idUsuario = await obtenerIdUsuario(); // Obtener el ID de usuario actual
            if (!idUsuario) {
                console.error('No se pudo obtener el ID de usuario');
                return;
            }
    
            const response = await fetch('http://127.0.0.1:5000/api/guardar_turno', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_profesional: idProfesional,
                    id_sede: idSede,
                    id_usuario: idUsuario, // Incluir el ID de usuario obtenido
                    horario: horarioSelect.options[horarioSelect.selectedIndex].textContent,
                    especialidad: especialidadSelect.value
                }),
                credentials: 'include'
            });
    
            if (!response.ok) {
                throw new Error('Error al guardar el turno');
            }
    
            const data = await response.json();
            console.log('Turno guardado:', data);
            // Redirigir al perfil del usuario
            window.location.href = './perfil_usuario.html'; // Ajusta la ruta según tu aplicación
        } catch (error) {
            console.error('Error al procesar el formulario:', error);
        }
    }

    function obtenerProfesionalSeleccionado() {
        const selectedIndex = profesionalSelect.selectedIndex;
        if (selectedIndex >= 0) {
            return {
                id: profesionalSelect.options[selectedIndex].value,
                nombre: profesionalSelect.options[selectedIndex].textContent.trim()
            };
        }
        return null;
    }

        // Función para obtener el ID de usuario desde la sesión de Flask
    async function obtenerIdUsuario() {
        // Realiza una solicitud al servidor Flask para obtener el ID de usuario actual
        return fetch('http://127.0.0.1:5000//api/current_user', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data.id_usuario; // Suponiendo que el servidor devuelve el ID de usuario
        })
        .catch(error => {
            console.error('Error al obtener el ID de usuario:', error);
            return null;
        });
    }    
});