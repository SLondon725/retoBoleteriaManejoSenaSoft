// Variables del DOM
let formulario = document.getElementById("formulario_evento");
let nombreEvento = document.getElementById("nombre_evento");
let descripcionEvento = document.getElementById("descripcion_evento");
let fechaInicioEvento = document.getElementById("fecha_inicio_evento");
let fechaFinEvento = document.getElementById("fecha_fin_evento");
let horaInicioEvento = document.getElementById("horaI_evento");
let horaFinEvento = document.getElementById("horaF_evento");
let lugarRealizacionInput = document.getElementById("lugarRealizacion");
let idMunicipioInput = document.getElementById("idMunicipio");
let idEstadoEventoInput = document.getElementById("idEstadoEvento");

// Event listener para el formulario
formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    await registrarEvento();
});

// Función para registrar evento usando la API
let registrarEvento = async () => {
    const nombre = nombreEvento.value.trim();
    const descripcion = descripcionEvento.value.trim();
    const fechaInicio = fechaInicioEvento.value;
    const fechaFin = fechaFinEvento.value;
    const horaInicio = horaInicioEvento.value;
    const horaFin = horaFinEvento.value;
    const lugarRealizacion = lugarRealizacionInput.value.trim();
    const idMunicipio = parseInt(idMunicipioInput.value);
    const idEstadoEvento = parseInt(idEstadoEventoInput.value);

    // Validación de campos
    if (!nombre || !descripcion || !fechaInicio || !fechaFin || !horaInicio || !horaFin || !lugarRealizacion || !idMunicipio || !idEstadoEvento) {
        mostrarMensaje("Hay campos vacíos, por favor ingrese todos los datos solicitados", "error");
        return;
    }

    // Validación de fechas
    if (new Date(fechaInicio) >= new Date(fechaFin)) {
        mostrarMensaje("La fecha de fin debe ser posterior a la fecha de inicio", "error");
        return;
    }

    try {
        const evento = {
            nombre,
            descripcion,
            fechaInicio,
            fechaFin,
            horaInicio,
            horaFin,
            lugarRealizacion,
            idMunicipio,
            idEstadoEvento
        };

        const response = await api.crearEvento(evento);
        
        if (response.success) {
            mostrarMensaje(`Evento registrado exitosamente! ID: ${response.data.id}`, "success");
            limpiarFormulario();
            cargarEventos(); // Recargar la lista de eventos
        } else {
            mostrarMensaje(response.message || "Error al registrar el evento", "error");
        }
    } catch (error) {
        console.error("Error al registrar evento:", error);
        mostrarMensaje("Error de conexión con el servidor", "error");
    }
};

// Función para cargar y mostrar eventos
let cargarEventos = async () => {
    try {
        const response = await api.obtenerEventos();
        if (response.success) {
            mostrarEventos(response.data);
        }
    } catch (error) {
        console.error("Error al cargar eventos:", error);
        mostrarMensaje("Error al cargar los eventos", "error");
    }
};

// Función para mostrar eventos en la interfaz
let mostrarEventos = (eventos) => {
    // Esta función se puede implementar para mostrar los eventos en una tabla
    console.log("Eventos cargados:", eventos);
};

// Función para limpiar el formulario
let limpiarFormulario = () => {
    formulario.reset();
};

// Función para mostrar mensajes al usuario
let mostrarMensaje = (mensaje, tipo) => {
    // Usar la función de notificación de apiUtils
    apiUtils.showNotification(mensaje, tipo);
};

// Cargar eventos al inicializar la página
document.addEventListener('DOMContentLoaded', async () => {
    await dataLoader.loadAllData('eventos');
    cargarEventos();
});