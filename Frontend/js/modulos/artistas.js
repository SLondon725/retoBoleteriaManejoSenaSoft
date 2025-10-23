// Variables del DOM
let formularioArtista = document.getElementById("formulario_artista");
let nombresArtista = document.getElementById("nombres_artista");
let apellidosArtista = document.getElementById("apellidos_artista");
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
    const nombres = nombresArtista ? nombresArtista.value.trim() : '';
    const apellidos = apellidosArtista ? apellidosArtista.value.trim() : '';
    const idGeneroMusical = generoMusicalSelect ? parseInt(generoMusicalSelect.value) : null;

    // Validación de campos
    if (!nombres || !apellidos || !idGeneroMusical) {
        mostrarMensaje("Hay campos vacíos, por favor ingrese todos los datos solicitados", "error");
        return;
    }

    try {
        const artista = {
            nombres,
            apellidos,
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
        const response = await api.obtenerArtistas();
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
    // Usar la función de notificación de apiUtils
    apiUtils.showNotification(mensaje, tipo);
};

// Cargar artistas al inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarArtistas();
});
