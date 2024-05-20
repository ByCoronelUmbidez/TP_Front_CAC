document.getElementById('contacto-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value;

    if (!nombre || !email || !asunto || !mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, complete todos los campos obligatorios.'
        });;
    } else {
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Mensaje enviado correctamente. ¡Gracias por contactarnos!'
        });
    }
});

btnEnviar.disabled = true;

document.addEventListener("DOMContentLoaded", function () {
    const evniarForm = document.getElementById('btnEnviar');
    const requerimientos = document.querySelectorAll('#contacto-form [required]');

    function checkrequerimientos() {
        evniarForm.disabled = [...requerimientos].some(campo => !campo.value.trim());
    }

    checkrequerimientos();
    requerimientos.forEach(campo => campo.addEventListener('input', checkrequerimientos));
});