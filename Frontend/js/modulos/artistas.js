// Variables del DOM
let formularioArtista = document.getElementById("formulario_artista");
let nombreArtista = document.getElementById("nombre_artista");
let descripcionArtista = document.getElementById("descripcion_artista");
let generoMusicalSelect = document.getElementById("genero_musical");

// Event listener para el formulario de artista
if (formularioArtista) {
    formularioArtista.addEventListener("submit", async (e) => {
        e.preventDefault();
        await registrarArtista();
    });
}

// Función para registrar artista usando la API
let registrarArtista = async () => {
    const nombre = nombreArtista ? nombreArtista.value.trim() : '';
    const descripcion = descripcionArtista ? descripcionArtista.value.trim() : '';
    const idGeneroMusical = generoMusicalSelect ? parseInt(generoMusicalSelect.value) : null;

    // Validación de campos
    if (!nombre || !descripcion || !idGeneroMusical) {
        mostrarMensaje("Hay campos vacíos, por favor ingrese todos los datos solicitados", "error");
        return;
    }

    try {
        const artista = {
            nombre,
            descripcion,
            idGeneroMusical
        };

        const response = await apiClient.createArtista(artista);
        
        if (response.success) {
            mostrarMensaje(`Artista registrado exitosamente! ID: ${response.data.id}`, "success");
            limpiarFormularioArtista();
            cargarArtistas(); // Recargar la lista de artistas
        } else {
            mostrarMensaje(response.message || "Error al registrar el artista", "error");
        }
    } catch (error) {
        console.error("Error al registrar artista:", error);
        mostrarMensaje("Error de conexión con el servidor", "error");
    }
};

// Función para cargar y mostrar artistas
let cargarArtistas = async () => {
    try {
        const response = await apiClient.getArtistas();
        if (response.success) {
            mostrarArtistas(response.data);
        }
    } catch (error) {
        console.error("Error al cargar artistas:", error);
        mostrarMensaje("Error al cargar los artistas", "error");
    }
};

// Función para mostrar artistas en la interfaz
let mostrarArtistas = (artistas) => {
    // Esta función se puede implementar para mostrar los artistas en una tabla
    console.log("Artistas cargados:", artistas);
};

// Función para limpiar el formulario de artista
let limpiarFormularioArtista = () => {
    if (formularioArtista) {
        formularioArtista.reset();
    }
};

// Función para mostrar mensajes al usuario
let mostrarMensaje = (mensaje, tipo) => {
    // Crear elemento de mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = `alert alert-${tipo === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
    mensajeDiv.innerHTML = `
        ${mensaje}
        <button type="button" class="close" data-dismiss="alert">
            <span>&times;</span>
        </button>
    `;
    
    // Insertar mensaje al inicio del contenido
    const content = document.querySelector('.container-fluid');
    if (content) {
        content.insertBefore(mensajeDiv, content.firstChild);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (mensajeDiv.parentNode) {
                mensajeDiv.remove();
            }
        }, 5000);
    }
};

// Cargar artistas al inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarArtistas();
});
