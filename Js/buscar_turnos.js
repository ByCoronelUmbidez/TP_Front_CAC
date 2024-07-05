document.addEventListener('DOMContentLoaded', function() {
    const especialidadSelect = document.getElementById('especialidad');
    const profesionalSelect = document.getElementById('profesional');
    const horarioSelect = document.getElementById('horario');
    const sedeSelect = document.getElementById('sede');
    const idProfesionalInput = document.getElementById('id_profesional');
    const idSedeInput = document.getElementById('id_sede');
    const idUsuarioInput = document.getElementById('id_usuario');
    const form = document.getElementById('formularioTurnos');

    especialidadSelect.addEventListener('change', function() {
        const selectedEspecialidad = especialidadSelect.value;
        console.log('Especialidad seleccionada:', selectedEspecialidad); // Verificar el valor seleccionado
        
        if (selectedEspecialidad) {
            cargarProfesionales(selectedEspecialidad);
            profesionalSelect.disabled = false;
            horarioSelect.disabled = true; // Deshabilitar horario hasta que se seleccione un profesional
        } else {
            profesionalSelect.disabled = true;
            horarioSelect.disabled = true;
        }
    });
    
    profesionalSelect.addEventListener('change', function() {
        const selectedProfesional = profesionalSelect.value;
        const selectedEspecialidad = especialidadSelect.value; // Asegurarse de tener selectedEspecialidad definida aquí
        console.log('Profesional seleccionado:', selectedProfesional); // Verificar el valor seleccionado
        
        if (selectedProfesional) {
            cargarHorarios(selectedEspecialidad); // Pasar selectedEspecialidad al cargar los horarios
            horarioSelect.disabled = false;
        } else {
            horarioSelect.disabled = true;
        }
    });
    
    function cargarEspecialidades() {
        fetch('http://127.0.0.1:5000/api/especialidades')
            .then(response => response.json())
            .then(data => {
                especialidadSelect.innerHTML = '<option value="">Selecciona una especialidad</option>'; // Limpiar select de especialidades
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
                profesionalSelect.innerHTML = '<option value="">Selecciona un profesional</option>'; // Limpiar select de profesionales
                data.forEach(profesional => {
                    const option = document.createElement('option');
                    option.textContent = profesional.nombre;
                    option.value = profesional.id; // Asegúrate de tener el ID del profesional aquí
                    profesionalSelect.appendChild(option);
                });
                if (data.length === 0) {
                    profesionalSelect.disabled = true; // Deshabilitar si no hay profesionales
                }
            })
            .catch(error => console.error('Error al cargar profesionales:', error));
    }
    
    function cargarHorarios(especialidad) {
        fetch(`http://127.0.0.1:5000/api/horarios/${encodeURIComponent(especialidad)}`)
            .then(response => response.json())
            .then(data => {
                horarioSelect.innerHTML = '<option value="">Selecciona un horario</option>'; // Limpiar select de horarios
                data.forEach(horario => {
                    const option = document.createElement('option');
                    option.textContent = horario.horario;
                    option.value = horario.id; // Asegúrate de tener el ID del horario aquí
                    horarioSelect.appendChild(option);
                });
                if (data.length === 0) {
                    horarioSelect.disabled = true; // Deshabilitar si no hay horarios
                }
            })
            .catch(error => console.error('Error al cargar horarios:', error));
    }

    function cargarSedes() {
        fetch('http://127.0.0.1:5000/api/sedes')
            .then(response => response.json())
            .then(data => {
                sedeSelect.innerHTML = '<option value="">Selecciona una sede</option>'; // Limpiar select de sedes
                data.forEach(sede => {
                    const option = document.createElement('option');
                    option.textContent = sede.nombre;
                    option.value = sede.id; // Asegúrate de tener el ID de la sede aquí
                    sedeSelect.appendChild(option);
                });
                sedeSelect.disabled = false;
            })
            .catch(error => console.error('Error al cargar sedes:', error));
    }

    cargarEspecialidades(); // Cargar las especialidades al cargar la página
    cargarSedes(); // Cargar las sedes al cargar la página

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe normalmente

        const idProfesional = idProfesionalInput.value;
        const idSede = idSedeInput.value;
        const idUsuario = idUsuarioInput.value;

        if (idProfesional && idSede && idUsuario) {
            // Aquí puedes enviar los datos al servidor para guardar el turno
            guardarTurno(idProfesional, idSede, idUsuario);
        } else {
            console.error('Faltan campos por completar.');
        }
    });

    function guardarTurno(idProfesional, idSede, idUsuario) {
        const formData = new FormData();
        formData.append('id_profesional', idProfesional);
        formData.append('id_sede', idSede);
        formData.append('id_usuario', idUsuario);

        fetch('http://127.0.0.1:5000/api/guardar_turno', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Turno guardado:', data);
            // Aquí puedes manejar la respuesta del servidor si es necesario
        })
        .catch(error => console.error('Error al guardar el turno:', error));
    }

});