document.querySelectorAll('.boton').forEach(boton => {
    boton.addEventListener('click', function(event) {
        // Evitar el comportamiento por defecto
        event.preventDefault();
        
        // Redirigir manualmente
        window.location.href = this.href;
    });
});