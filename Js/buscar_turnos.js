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
    sedees: [
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

const especialidadSelect = document.getElementById('especialidad');
const sedeSelect = document.getElementById('sede');
const fechaSelect = document.getElementById('horario');
const submitBtn = document.getElementById('submitBtn');

function actualizarHorariosDisponibles() {
    const especialidadSeleccionada = especialidadSelect.value;
    const sedeSeleccionada = sedeSelect.value;

    const horariosDisponibles = data.profesionales.reduce((acc, profesional) => {
        if (profesional.especialidad === especialidadSeleccionada && profesional.sede === sedeSeleccionada) {
            profesional.dia.forEach(dia => {
                profesional.horario.forEach(horario => {
                    acc.push(`${dia} ${horario} - ${profesional.nombre}`);
                });
            });
        }
        return acc;
    }, []);

    fechaSelect.innerHTML = '<option value="" disabled selected>Seleccione un horario</option>';
    if (horariosDisponibles.length > 0) {
        horariosDisponibles.forEach(horario => fechaSelect.add(new Option(horario)));
        fechaSelect.disabled = false;
    } else {
        fechaSelect.add(new Option('No hay médicos disponibles'));
        fechaSelect.disabled = true;
    }
}

function verificarSeleccionHorario() {
    submitBtn.disabled = fechaSelect.value === 'No hay médicos disponibles' || fechaSelect.value === '';
}

especialidadSelect.addEventListener('change', actualizarHorariosDisponibles);
sedeSelect.addEventListener('change', actualizarHorariosDisponibles);
fechaSelect.addEventListener('change', verificarSeleccionHorario);

submitBtn.disabled = true;

submitBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const fechaSeleccionada = fechaSelect.value;
    if (fechaSeleccionada && fechaSeleccionada !== 'No hay médicos disponibles') {
        seleccionarTurno(fechaSeleccionada);
    }
});

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