const data = {
    profesionales: [
        { 
            nombre: "Dr. Juan Pérez",
            especialidad: "Cardiología",
            dia: ["Lunes","Miércoles"],
            horario: ["9:00","10:00","11:00","12:00"],
            sede: "Sede Central"
        },
        { 
            nombre: "Dra. María García",
            especialidad: "Odontología",
            dia: ["Martes","Jueves"],
            horario: ["10:00","11:00","12:00","13:00","14:00"],
            sede: "Sucursal Norte"
        },
        { 
            nombre: "Dr. Roberto Martínez",
            especialidad: "Pediatría",
            dia: ["Lunes","Viernes"],
            horario: ["8:00","9:00","10:00","11:00","12:00","13:00"],
            sede: "Sede Central"
        },
        { 
            nombre: "Dra. Laura Rodríguez",
            especialidad: "Dermatología",
            dia: ["Miercoles","Viernes"],
            horario: ["14:00","15:00","16:00","17:00","18:00"],
            sede: "Sucursal Norte"
        },
        { 
            nombre: "Dr. Carlos Sánchez",
            especialidad: "Ginecología",
            dia: ["Martes","Jueves"],
            horario: ["8:00","9:00","10:00","11:00","12:00"],
            sede: "Sede Central"
        },
        { 
            nombre: "Dra. Ana López",
            especialidad: "Oftalmología",
            dia: ["Lunes","Miércoles"],
            horario: ["10:00","11:00","12:00","13:00","14:00","15:00"],
            sede: "Sucursal Norte"
        },
        { 
            nombre: "Dr. Manuel González",
            especialidad: "Ortopedia",
            dia: ["Martes","Jueves"],
            horario: ["9:00","10:00","11:00","12:00","13:00"],
            sede: "Sede Central"
        },
        { 
            nombre: "Dra. Marta Díaz",
            especialidad: "Psicología",
            dia: ["Miercoles","Viernes"],
            horario:["10:00","11:00","12:00","13:00","14:00","15:00","16:00"],
            sede: "Sucursal Norte"
        },
        { 
            nombre: "Dr. Javier Ruiz",
            especialidad: "Urología",
            dia: ["Lunes","Jueves"],
            horario: ["8:00","9:00","10:00","11:00","12:00"],
            sede: "Sede Central"
        },
        { 
            nombre: "Dra. Patricia Fernández",
            especialidad: "Endocrinología",
            dia: ["Martes","Viernes"],
            horario: ["9:00","10:00","11:00","12:00","13:00","14:00"],
            sede: "Sucursal Norte"
        }
    ],
    locaciones: [
        {
            sede: "Sede Central",
            direccion: "Calle Principal 123",
            telefono: "(123) 456-7890"
        },
        {
            sede: "Sucursal Norte",
            direccion: "Avenida Norte 456",
            telefono: "(987) 654-3210"
        }
    ]
};



// Obtener referencias a los elementos del formulario
const especialidadSelect = document.getElementById('especialidad');
const locacionSelect = document.getElementById('locacion');
const fechaSelect = document.getElementById('fecha');
const submitBtn = document.getElementById('submitBtn');

// Función para filtrar la información y actualizar las opciones de fecha
function actualizarHorariosDisponibles() {
    const especialidadSeleccionada = especialidadSelect.value;
    const locacionSeleccionada = locacionSelect.value;

    // Filtrar los profesionales según la especialidad y la sede seleccionadas
    const profesionalesFiltrados = data.profesionales.filter(profesional =>
        profesional.especialidad === especialidadSeleccionada &&
        profesional.sede === locacionSeleccionada
    );

    // Crear un conjunto de todos los días y horarios disponibles con los nombres de los médicos
    const horariosDisponibles = new Set();
    profesionalesFiltrados.forEach(profesional => {
        profesional.dia.forEach(dia => {
            profesional.horario.forEach(horario => {
                horariosDisponibles.add(`${dia} ${horario} - ${profesional.nombre}`);
            });
        });
    });

    // Limpiar las opciones actuales de fecha y agregar las nuevas opciones
    fechaSelect.innerHTML = '<option value="" disabled selected>Seleccione un horario</option>';
    if (horariosDisponibles.size > 0) {
        horariosDisponibles.forEach(horario => {
            const option = document.createElement('option');
            option.text = horario;
            fechaSelect.add(option);
        });
        fechaSelect.disabled = false;
        submitBtn.disabled = true;
    } else {
        const option = document.createElement('option');
        option.text = 'No hay médicos disponibles';
        fechaSelect.add(option);
        fechaSelect.disabled = true;
        submitBtn.disabled = true;
    }
}

// Función para habilitar/deshabilitar el botón de enviar
function verificarSeleccionHorario() {
    submitBtn.disabled = fechaSelect.value === 'No hay médicos disponibles' || fechaSelect.value === '';
}

// Asociar la función actualizarHorariosDisponibles al evento de cambio en los select de especialidad y sede
especialidadSelect.addEventListener('change', actualizarHorariosDisponibles);
locacionSelect.addEventListener('change', actualizarHorariosDisponibles);
fechaSelect.addEventListener('change', verificarSeleccionHorario);

// Deshabilitar el botón de enviar por defecto
submitBtn.disabled = true;

function seleccionarTurno(turnoSeleccionado) {
    Swal.fire({
        title: '¡Turno Agendado!',
        text: `Se ha agendado exitosamente su turno para ${turnoSeleccionado}. Se ha enviado un correo electrónico con la confirmación.`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        customClass: {
            popup: 'my-swal-popup',
            title: 'my-swal-title',
            content: 'my-swal-content',
            confirmButton: 'my-swal-confirm'
        }
    });
}


// Llama a la función seleccionarTurno cuando se hace clic en el botón "Elegir Turno"
submitBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const fechaSeleccionada = document.getElementById('fecha').value;
    if (fechaSeleccionada && fechaSeleccionada !== 'No hay médicos disponibles') {
        seleccionarTurno(fechaSeleccionada);
    }
});
