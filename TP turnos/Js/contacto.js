document.getElementById('contacto-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value;

    if (!nombre || !email || !asunto || !mensaje) {
        alert('Por favor, complete todos los campos obligatorios.');
    } else {
        alert('Mensaje enviado correctamente. ¡Gracias por contactarnos!');
    }
});