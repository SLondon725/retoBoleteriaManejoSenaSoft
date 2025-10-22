// Variables del DOM
let formularioBoleteria = document.getElementById("formulario_boleteria");
let formularioLocalidad = document.getElementById("formulario_localidad");
let formularioLocalidadDetalle = document.getElementById("formulario_localidad_detalle");

// Event listeners para los formularios
if (formularioBoleteria) {
    formularioBoleteria.addEventListener("submit", async (e) => {
        e.preventDefault();
        await procesarBoleteria();
    });
}

if (formularioLocalidad) {
    formularioLocalidad.addEventListener("submit", async (e) => {
        e.preventDefault();
        await registrarLocalidad();
    });
}

if (formularioLocalidadDetalle) {
    formularioLocalidadDetalle.addEventListener("submit", async (e) => {
        e.preventDefault();
        await registrarLocalidadDetalle();
    });
}

// Función para procesar boletería (compra de boletas)
let procesarBoleteria = async () => {
    // Esta función se implementará cuando se tenga la lógica de compra
    console.log("Procesando boletería...");
    mostrarMensaje("Funcionalidad de boletería en desarrollo", "info");
};

// Función para registrar localidad usando la API
let registrarLocalidad = async () => {
    const nombreLocalidad = document.getElementById("nombre_localidad")?.value.trim();
    const descripcionLocalidad = document.getElementById("descripcion_localidad")?.value.trim();

    // Validación de campos
    if (!nombreLocalidad) {
        mostrarMensaje("El nombre de la localidad es requerido", "error");
        return;
    }

    try {
        const localidad = {
            nombre: nombreLocalidad,
            descripcion: descripcionLocalidad || ''
        };

        const response = await apiClient.createLocalidad(localidad);
        
        if (response.success) {
            mostrarMensaje(`Localidad registrada exitosamente! ID: ${response.data.id}`, "success");
            limpiarFormularioLocalidad();
            cargarLocalidades(); // Recargar la lista de localidades
        } else {
            mostrarMensaje(response.message || "Error al registrar la localidad", "error");
        }
    } catch (error) {
        console.error("Error al registrar localidad:", error);
        mostrarMensaje("Error de conexión con el servidor", "error");
    }
};

// Función para registrar localidad detalle usando la API
let registrarLocalidadDetalle = async () => {
    const idEvento = document.getElementById("id_evento")?.value;
    const idLocalidad = document.getElementById("id_localidad")?.value;
    const precio = document.getElementById("precio")?.value;
    const cantidadDisponible = document.getElementById("cantidad_disponible")?.value;

    // Validación de campos
    if (!idEvento || !idLocalidad || !precio || !cantidadDisponible) {
        mostrarMensaje("Todos los campos son requeridos", "error");
        return;
    }

    try {
        const localidadDetalle = {
            idEvento: parseInt(idEvento),
            idLocalidad: parseInt(idLocalidad),
            precio: parseFloat(precio),
            cantidadDisponible: parseInt(cantidadDisponible)
        };

        const response = await apiClient.createLocalidadDetalle(localidadDetalle);
        
        if (response.success) {
            mostrarMensaje(`Localidad detalle registrada exitosamente! ID: ${response.data.id}`, "success");
            limpiarFormularioLocalidadDetalle();
            cargarLocalidadesDetalle(); // Recargar la lista
        } else {
            mostrarMensaje(response.message || "Error al registrar la localidad detalle", "error");
        }
    } catch (error) {
        console.error("Error al registrar localidad detalle:", error);
        mostrarMensaje("Error de conexión con el servidor", "error");
    }
};

// Función para cargar y mostrar localidades
let cargarLocalidades = async () => {
    try {
        const response = await apiClient.getLocalidades();
        if (response.success) {
            mostrarLocalidades(response.data);
        }
    } catch (error) {
        console.error("Error al cargar localidades:", error);
        mostrarMensaje("Error al cargar las localidades", "error");
    }
};

// Función para cargar y mostrar localidades detalle
let cargarLocalidadesDetalle = async () => {
    try {
        const response = await apiClient.getLocalidadesDetalle();
        if (response.success) {
            mostrarLocalidadesDetalle(response.data);
        }
    } catch (error) {
        console.error("Error al cargar localidades detalle:", error);
        mostrarMensaje("Error al cargar las localidades detalle", "error");
    }
};

// Función para mostrar localidades en la interfaz
let mostrarLocalidades = (localidades) => {
    console.log("Localidades cargadas:", localidades);
};

// Función para mostrar localidades detalle en la interfaz
let mostrarLocalidadesDetalle = (localidadesDetalle) => {
    console.log("Localidades detalle cargadas:", localidadesDetalle);
};

// Función para limpiar el formulario de localidad
let limpiarFormularioLocalidad = () => {
    if (formularioLocalidad) {
        formularioLocalidad.reset();
    }
};

// Función para limpiar el formulario de localidad detalle
let limpiarFormularioLocalidadDetalle = () => {
    if (formularioLocalidadDetalle) {
        formularioLocalidadDetalle.reset();
    }
};

// Función para mostrar mensajes al usuario
let mostrarMensaje = (mensaje, tipo) => {
    // Crear elemento de mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = `alert alert-${tipo === 'success' ? 'success' : tipo === 'info' ? 'info' : 'danger'} alert-dismissible fade show`;
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

// Cargar datos al inicializar la página
document.addEventListener('DOMContentLoaded', async () => {
    await dataLoader.loadAllData('boleteria');
    cargarLocalidades();
    cargarLocalidadesDetalle();
});
