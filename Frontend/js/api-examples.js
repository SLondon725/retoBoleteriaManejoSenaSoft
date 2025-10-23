/**
 * Ejemplos de uso de las rutas de API
 * Este archivo contiene ejemplos prácticos de cómo usar las rutas de conexión
 */

// ==================== EJEMPLOS DE AUTENTICACIÓN ====================

/**
 * Ejemplo de login
 */
async function ejemploLogin() {
    try {
        const resultado = await api.login('12345678', 'password123');
        console.log('Login exitoso:', resultado);
        
        // Guardar token en localStorage
        if (resultado.token) {
            localStorage.setItem('authToken', resultado.token);
        }
    } catch (error) {
        console.error('Error en login:', error.message);
    }
}

// ==================== EJEMPLOS DE USUARIOS ====================

/**
 * Ejemplo de obtener todos los usuarios
 */
async function ejemploObtenerUsuarios() {
    try {
        const usuarios = await api.obtenerUsuarios();
        console.log('Usuarios:', usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
    }
}

/**
 * Ejemplo de crear usuario
 */
async function ejemploCrearUsuario() {
    const nuevoUsuario = {
        numIdentificacion: '12345678',
        nombre: 'Juan Pérez',
        apellido: 'García',
        correo: 'juan.perez@email.com',
        telefono: '3001234567',
        direccion: 'Calle 123 #45-67',
        idRol: 1,
        password: 'password123'
    };

    try {
        const usuarioCreado = await api.crearUsuario(nuevoUsuario);
        console.log('Usuario creado:', usuarioCreado);
    } catch (error) {
        console.error('Error al crear usuario:', error.message);
    }
}

/**
 * Ejemplo de buscar usuarios
 */
async function ejemploBuscarUsuarios() {
    try {
        const usuarios = await api.buscarUsuarios('Juan');
        console.log('Usuarios encontrados:', usuarios);
    } catch (error) {
        console.error('Error al buscar usuarios:', error.message);
    }
}

// ==================== EJEMPLOS DE ARTISTAS ====================

/**
 * Ejemplo de obtener todos los artistas
 */
async function ejemploObtenerArtistas() {
    try {
        const artistas = await api.obtenerArtistas();
        console.log('Artistas:', artistas);
    } catch (error) {
        console.error('Error al obtener artistas:', error.message);
    }
}

/**
 * Ejemplo de crear artista
 */
async function ejemploCrearArtista() {
    const nuevoArtista = {
        nombre: 'Shakira',
        apellido: 'Mebarak',
        nombreArtistico: 'Shakira',
        biografia: 'Cantante y compositora colombiana',
        fechaNacimiento: '1977-02-02',
        idGeneroMusical: 1,
        idMunicipio: 1,
        redesSociales: {
            instagram: '@shakira',
            twitter: '@shakira'
        }
    };

    try {
        const artistaCreado = await api.crearArtista(nuevoArtista);
        console.log('Artista creado:', artistaCreado);
    } catch (error) {
        console.error('Error al crear artista:', error.message);
    }
}

/**
 * Ejemplo de obtener artistas por género
 */
async function ejemploObtenerArtistasPorGenero() {
    try {
        const artistas = await api.obtenerArtistasPorGenero(1); // ID del género
        console.log('Artistas del género:', artistas);
    } catch (error) {
        console.error('Error al obtener artistas por género:', error.message);
    }
}

// ==================== EJEMPLOS DE EVENTOS ====================

/**
 * Ejemplo de obtener todos los eventos
 */
async function ejemploObtenerEventos() {
    try {
        const eventos = await api.obtenerEventos();
        console.log('Eventos:', eventos);
    } catch (error) {
        console.error('Error al obtener eventos:', error.message);
    }
}

/**
 * Ejemplo de obtener eventos próximos
 */
async function ejemploObtenerEventosProximos() {
    try {
        const eventos = await api.obtenerEventosProximos();
        console.log('Eventos próximos:', eventos);
    } catch (error) {
        console.error('Error al obtener eventos próximos:', error.message);
    }
}

/**
 * Ejemplo de crear evento
 */
async function ejemploCrearEvento() {
    const nuevoEvento = {
        nombre: 'Concierto de Shakira',
        descripcion: 'Concierto en vivo de Shakira',
        fechaInicio: '2024-12-25T20:00:00Z',
        fechaFin: '2024-12-25T23:00:00Z',
        idLocalidad: 1,
        idEstadoEvento: 1,
        precioBase: 50000,
        imagen: 'https://example.com/imagen.jpg'
    };

    try {
        const eventoCreado = await api.crearEvento(nuevoEvento);
        console.log('Evento creado:', eventoCreado);
    } catch (error) {
        console.error('Error al crear evento:', error.message);
    }
}

/**
 * Ejemplo de filtrar eventos
 */
async function ejemploFiltrarEventos() {
    const filtros = {
        municipio: 1,
        estado: 1,
        fechaInicio: '2024-01-01',
        fechaFin: '2024-12-31'
    };

    try {
        const eventos = await api.obtenerEventosPorFiltro(filtros);
        console.log('Eventos filtrados:', eventos);
    } catch (error) {
        console.error('Error al filtrar eventos:', error.message);
    }
}

// ==================== EJEMPLOS DE LOCALIDADES ====================

/**
 * Ejemplo de obtener todas las localidades
 */
async function ejemploObtenerLocalidades() {
    try {
        const localidades = await api.obtenerLocalidades();
        console.log('Localidades:', localidades);
    } catch (error) {
        console.error('Error al obtener localidades:', error.message);
    }
}

/**
 * Ejemplo de crear localidad
 */
async function ejemploCrearLocalidad() {
    const nuevaLocalidad = {
        nombre: 'Estadio El Campín',
        direccion: 'Calle 57 #30-00',
        capacidad: 50000,
        idMunicipio: 1,
        descripcion: 'Estadio principal de Bogotá'
    };

    try {
        const localidadCreada = await api.crearLocalidad(nuevaLocalidad);
        console.log('Localidad creada:', localidadCreada);
    } catch (error) {
        console.error('Error al crear localidad:', error.message);
    }
}

// ==================== EJEMPLOS DE LOCALIDADES DETALLE ====================

/**
 * Ejemplo de obtener detalles de localidades
 */
async function ejemploObtenerDetallesLocalidades() {
    try {
        const detalles = await api.obtenerLocalidadesDetalle();
        console.log('Detalles de localidades:', detalles);
    } catch (error) {
        console.error('Error al obtener detalles:', error.message);
    }
}

/**
 * Ejemplo de obtener detalles por evento
 */
async function ejemploObtenerDetallesPorEvento() {
    try {
        const detalles = await api.obtenerDetallesPorEvento(1); // ID del evento
        console.log('Detalles del evento:', detalles);
    } catch (error) {
        console.error('Error al obtener detalles por evento:', error.message);
    }
}

/**
 * Ejemplo de crear detalle de localidad
 */
async function ejemploCrearDetalleLocalidad() {
    const nuevoDetalle = {
        idLocalidad: 1,
        idEvento: 1,
        nombre: 'VIP',
        precio: 100000,
        cantidadDisponible: 100,
        descripcion: 'Zona VIP con servicios premium'
    };

    try {
        const detalleCreado = await api.crearLocalidadDetalle(nuevoDetalle);
        console.log('Detalle creado:', detalleCreado);
    } catch (error) {
        console.error('Error al crear detalle:', error.message);
    }
}

// ==================== EJEMPLOS DE COMPRAS ====================

/**
 * Ejemplo de obtener todas las compras
 */
async function ejemploObtenerCompras() {
    try {
        const compras = await api.obtenerCompras();
        console.log('Compras:', compras);
    } catch (error) {
        console.error('Error al obtener compras:', error.message);
    }
}

/**
 * Ejemplo de registrar compra
 */
async function ejemploRegistrarCompra() {
    const nuevaCompra = {
        idUsuario: '12345678',
        idLocalidadDetalle: 1,
        cantidad: 2,
        precioTotal: 200000,
        idMetodoPago: 1,
        idEstadoTransaccion: 1
    };

    try {
        const compraRegistrada = await api.registrarCompra(nuevaCompra);
        console.log('Compra registrada:', compraRegistrada);
    } catch (error) {
        console.error('Error al registrar compra:', error.message);
    }
}

/**
 * Ejemplo de obtener compras por fecha
 */
async function ejemploObtenerComprasPorFecha() {
    try {
        const compras = await api.obtenerComprasPorFecha('2024-01-15');
        console.log('Compras del día:', compras);
    } catch (error) {
        console.error('Error al obtener compras por fecha:', error.message);
    }
}

// ==================== EJEMPLOS DE ROLES ====================

/**
 * Ejemplo de obtener todos los roles
 */
async function ejemploObtenerRoles() {
    try {
        const roles = await api.obtenerRoles();
        console.log('Roles:', roles);
    } catch (error) {
        console.error('Error al obtener roles:', error.message);
    }
}

/**
 * Ejemplo de crear rol
 */
async function ejemploCrearRol() {
    const nuevoRol = {
        nombre: 'Organizador',
        descripcion: 'Rol para organizadores de eventos'
    };

    try {
        const rolCreado = await api.crearRol(nuevoRol);
        console.log('Rol creado:', rolCreado);
    } catch (error) {
        console.error('Error al crear rol:', error.message);
    }
}

// ==================== EJEMPLOS DE ASOCIACIÓN ARTISTA-EVENTO ====================

/**
 * Ejemplo de asociar artista con evento
 */
async function ejemploAsociarArtistaEvento() {
    const asociacion = {
        idArtista: 1,
        idEvento: 1,
        fechaAsociacion: '2024-01-01'
    };

    try {
        const asociacionCreada = await api.asociarArtistaEvento(asociacion);
        console.log('Asociación creada:', asociacionCreada);
    } catch (error) {
        console.error('Error al asociar artista con evento:', error.message);
    }
}

// ==================== EJEMPLOS DE UTILIDADES ====================

/**
 * Ejemplo de verificar salud de la API
 */
async function ejemploVerificarSalud() {
    try {
        const salud = await api.verificarSalud();
        console.log('Estado de la API:', salud);
    } catch (error) {
        console.error('Error al verificar salud:', error.message);
    }
}

/**
 * Ejemplo de obtener información de la API
 */
async function ejemploObtenerInfoAPI() {
    try {
        const info = await api.obtenerInfoAPI();
        console.log('Información de la API:', info);
    } catch (error) {
        console.error('Error al obtener información:', error.message);
    }
}

// ==================== FUNCIONES DE UTILIDAD ====================

/**
 * Función para manejar errores de forma consistente
 * @param {Error} error - Error capturado
 * @param {string} operacion - Nombre de la operación que falló
 */
function manejarError(error, operacion) {
    console.error(`Error en ${operacion}:`, error.message);
    
    // Mostrar mensaje al usuario
    if (typeof window !== 'undefined' && window.alert) {
        window.alert(`Error en ${operacion}: ${error.message}`);
    }
}

/**
 * Función para verificar si el usuario está autenticado
 * @returns {boolean} - True si está autenticado
 */
function estaAutenticado() {
    return localStorage.getItem('authToken') !== null;
}

/**
 * Función para obtener el token de autenticación
 * @returns {string|null} - Token de autenticación o null
 */
function obtenerToken() {
    return localStorage.getItem('authToken');
}

/**
 * Función para cerrar sesión
 */
function cerrarSesion() {
    localStorage.removeItem('authToken');
    console.log('Sesión cerrada');
}

// ==================== EJEMPLO DE FLUJO COMPLETO ====================

/**
 * Ejemplo de flujo completo: Login -> Obtener eventos -> Crear compra
 */
async function ejemploFlujoCompleto() {
    try {
        // 1. Login
        console.log('1. Realizando login...');
        const loginResult = await api.login('12345678', 'password123');
        console.log('Login exitoso:', loginResult);

        // 2. Obtener eventos próximos
        console.log('2. Obteniendo eventos próximos...');
        const eventos = await api.obtenerEventosProximos();
        console.log('Eventos próximos:', eventos);

        // 3. Obtener detalles de localidades para el primer evento
        if (eventos.data && eventos.data.length > 0) {
            const primerEvento = eventos.data[0];
            console.log('3. Obteniendo detalles para el evento:', primerEvento.nombre);
            const detalles = await api.obtenerDetallesPorEvento(primerEvento.id);
            console.log('Detalles del evento:', detalles);

            // 4. Registrar compra (si hay detalles disponibles)
            if (detalles.data && detalles.data.length > 0) {
                const primerDetalle = detalles.data[0];
                console.log('4. Registrando compra...');
                const compra = {
                    idUsuario: '12345678',
                    idLocalidadDetalle: primerDetalle.id,
                    cantidad: 1,
                    precioTotal: primerDetalle.precio,
                    idMetodoPago: 1,
                    idEstadoTransaccion: 1
                };
                
                const compraRegistrada = await api.registrarCompra(compra);
                console.log('Compra registrada:', compraRegistrada);
            }
        }

        console.log('Flujo completo ejecutado exitosamente');
    } catch (error) {
        manejarError(error, 'flujo completo');
    }
}

// Exportar funciones para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ejemploLogin,
        ejemploObtenerUsuarios,
        ejemploCrearUsuario,
        ejemploBuscarUsuarios,
        ejemploObtenerArtistas,
        ejemploCrearArtista,
        ejemploObtenerArtistasPorGenero,
        ejemploObtenerEventos,
        ejemploObtenerEventosProximos,
        ejemploCrearEvento,
        ejemploFiltrarEventos,
        ejemploObtenerLocalidades,
        ejemploCrearLocalidad,
        ejemploObtenerDetallesLocalidades,
        ejemploObtenerDetallesPorEvento,
        ejemploCrearDetalleLocalidad,
        ejemploObtenerCompras,
        ejemploRegistrarCompra,
        ejemploObtenerComprasPorFecha,
        ejemploObtenerRoles,
        ejemploCrearRol,
        ejemploAsociarArtistaEvento,
        ejemploVerificarSalud,
        ejemploObtenerInfoAPI,
        ejemploFlujoCompleto,
        manejarError,
        estaAutenticado,
        obtenerToken,
        cerrarSesion
    };
}

// Hacer disponible globalmente en el navegador
if (typeof window !== 'undefined') {
    window.ejemplosAPI = {
        ejemploLogin,
        ejemploObtenerUsuarios,
        ejemploCrearUsuario,
        ejemploBuscarUsuarios,
        ejemploObtenerArtistas,
        ejemploCrearArtista,
        ejemploObtenerArtistasPorGenero,
        ejemploObtenerEventos,
        ejemploObtenerEventosProximos,
        ejemploCrearEvento,
        ejemploFiltrarEventos,
        ejemploObtenerLocalidades,
        ejemploCrearLocalidad,
        ejemploObtenerDetallesLocalidades,
        ejemploObtenerDetallesPorEvento,
        ejemploCrearDetalleLocalidad,
        ejemploObtenerCompras,
        ejemploRegistrarCompra,
        ejemploObtenerComprasPorFecha,
        ejemploObtenerRoles,
        ejemploCrearRol,
        ejemploAsociarArtistaEvento,
        ejemploVerificarSalud,
        ejemploObtenerInfoAPI,
        ejemploFlujoCompleto,
        manejarError,
        estaAutenticado,
        obtenerToken,
        cerrarSesion
    };
}
