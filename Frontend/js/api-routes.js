/**
 * Configuración de rutas de API para conectar con el backend
 * Base URL: http://localhost:3000/manejo_boleteria
 */

const API_BASE_URL = 'http://localhost:3000/manejo_boleteria';

// Configuración de headers por defecto
const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

/**
 * Clase para manejar las rutas de la API
 */
class ApiRoutes {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    /**
     * Realiza una petición HTTP
     * @param {string} endpoint - Endpoint de la API
     * @param {Object} options - Opciones de la petición
     * @returns {Promise} - Respuesta de la API
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: { ...defaultHeaders, ...options.headers },
            ...options
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Error en la petición');
            }
            
            return data;
        } catch (error) {
            console.error('Error en la petición:', error);
            throw error;
        }
    }

    // ==================== RUTAS DE AUTENTICACIÓN ====================
    
    /**
     * Login de usuario
     * @param {string} id - ID del usuario
     * @param {string} password - Contraseña
     * @returns {Promise} - Token de autenticación
     */
    async login(id, password) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ id, password })
        });
    }

    // ==================== RUTAS DE USUARIOS ====================
    
    /**
     * Obtener todos los usuarios
     * @returns {Promise} - Lista de usuarios
     */
    async obtenerUsuarios() {
        return this.request('/usuarios');
    }

    /**
     * Buscar usuarios por nombre
     * @param {string} nombre - Nombre a buscar
     * @returns {Promise} - Usuarios encontrados
     */
    async buscarUsuarios(nombre) {
        return this.request(`/usuarios/buscar?nombre=${encodeURIComponent(nombre)}`);
    }

    /**
     * Obtener usuario por correo
     * @param {string} correo - Correo del usuario
     * @returns {Promise} - Usuario encontrado
     */
    async obtenerUsuarioPorCorreo(correo) {
        return this.request(`/usuarios/correo/${encodeURIComponent(correo)}`);
    }

    /**
     * Obtener usuarios por rol
     * @param {number} idRol - ID del rol
     * @returns {Promise} - Usuarios del rol
     */
    async obtenerUsuariosPorRol(idRol) {
        return this.request(`/usuarios/rol/${idRol}`);
    }

    /**
     * Obtener usuario por ID
     * @param {string} numIdentificacion - Número de identificación
     * @returns {Promise} - Usuario encontrado
     */
    async obtenerUsuarioPorId(numIdentificacion) {
        return this.request(`/usuarios/${numIdentificacion}`);
    }

    /**
     * Crear nuevo usuario
     * @param {Object} usuario - Datos del usuario
     * @returns {Promise} - Usuario creado
     */
    async crearUsuario(usuario) {
        return this.request('/usuarios', {
            method: 'POST',
            body: JSON.stringify(usuario)
        });
    }

    /**
     * Verificar credenciales
     * @param {Object} credenciales - Credenciales a verificar
     * @returns {Promise} - Resultado de la verificación
     */
    async verificarCredenciales(credenciales) {
        return this.request('/usuarios/verificar-credenciales', {
            method: 'POST',
            body: JSON.stringify(credenciales)
        });
    }

    /**
     * Actualizar usuario
     * @param {string} numIdentificacion - Número de identificación
     * @param {Object} usuario - Datos actualizados
     * @returns {Promise} - Usuario actualizado
     */
    async actualizarUsuario(numIdentificacion, usuario) {
        return this.request(`/usuarios/${numIdentificacion}`, {
            method: 'PUT',
            body: JSON.stringify(usuario)
        });
    }

    /**
     * Cambiar contraseña
     * @param {string} numIdentificacion - Número de identificación
     * @param {Object} passwordData - Datos de la nueva contraseña
     * @returns {Promise} - Resultado del cambio
     */
    async cambiarPassword(numIdentificacion, passwordData) {
        return this.request(`/usuarios/${numIdentificacion}/password`, {
            method: 'PUT',
            body: JSON.stringify(passwordData)
        });
    }

    /**
     * Eliminar usuario
     * @param {string} numIdentificacion - Número de identificación
     * @returns {Promise} - Resultado de la eliminación
     */
    async eliminarUsuario(numIdentificacion) {
        return this.request(`/usuarios/${numIdentificacion}`, {
            method: 'DELETE'
        });
    }

    // ==================== RUTAS DE ROLES ====================
    
    /**
     * Obtener todos los roles
     * @returns {Promise} - Lista de roles
     */
    async obtenerRoles() {
        return this.request('/roles');
    }

    /**
     * Buscar roles por nombre
     * @param {string} nombre - Nombre a buscar
     * @returns {Promise} - Roles encontrados
     */
    async buscarRoles(nombre) {
        return this.request(`/roles/buscar?nombre=${encodeURIComponent(nombre)}`);
    }

    /**
     * Obtener rol por ID
     * @param {number} id - ID del rol
     * @returns {Promise} - Rol encontrado
     */
    async obtenerRolPorId(id) {
        return this.request(`/roles/${id}`);
    }

    /**
     * Obtener usuarios por rol
     * @param {number} idRol - ID del rol
     * @returns {Promise} - Usuarios del rol
     */
    async obtenerUsuariosPorRol(idRol) {
        return this.request(`/roles/${idRol}/usuarios`);
    }

    /**
     * Crear nuevo rol
     * @param {Object} rol - Datos del rol
     * @returns {Promise} - Rol creado
     */
    async crearRol(rol) {
        return this.request('/roles', {
            method: 'POST',
            body: JSON.stringify(rol)
        });
    }

    /**
     * Actualizar rol
     * @param {number} id - ID del rol
     * @param {Object} rol - Datos actualizados
     * @returns {Promise} - Rol actualizado
     */
    async actualizarRol(id, rol) {
        return this.request(`/roles/${id}`, {
            method: 'PUT',
            body: JSON.stringify(rol)
        });
    }

    /**
     * Eliminar rol
     * @param {number} id - ID del rol
     * @returns {Promise} - Resultado de la eliminación
     */
    async eliminarRol(id) {
        return this.request(`/roles/${id}`, {
            method: 'DELETE'
        });
    }

    // ==================== RUTAS DE ARTISTAS ====================
    
    /**
     * Obtener todos los artistas
     * @returns {Promise} - Lista de artistas
     */
    async obtenerArtistas() {
        return this.request('/artistas');
    }

    /**
     * Obtener artistas por género musical
     * @param {number} idGeneroMusical - ID del género musical
     * @returns {Promise} - Artistas del género
     */
    async obtenerArtistasPorGenero(idGeneroMusical) {
        return this.request(`/artistas/genero/${idGeneroMusical}`);
    }

    /**
     * Obtener artistas por municipio
     * @param {number} idMunicipio - ID del municipio
     * @returns {Promise} - Artistas del municipio
     */
    async obtenerArtistasPorMunicipio(idMunicipio) {
        return this.request(`/artistas/municipio/${idMunicipio}`);
    }

    /**
     * Obtener artista por ID
     * @param {number} id - ID del artista
     * @returns {Promise} - Artista encontrado
     */
    async obtenerArtistaPorId(id) {
        return this.request(`/artistas/${id}`);
    }

    /**
     * Crear nuevo artista
     * @param {Object} artista - Datos del artista
     * @returns {Promise} - Artista creado
     */
    async crearArtista(artista) {
        return this.request('/artistas', {
            method: 'POST',
            body: JSON.stringify(artista)
        });
    }

    /**
     * Actualizar artista
     * @param {number} id - ID del artista
     * @param {Object} artista - Datos actualizados
     * @returns {Promise} - Artista actualizado
     */
    async actualizarArtista(id, artista) {
        return this.request(`/artistas/${id}`, {
            method: 'PUT',
            body: JSON.stringify(artista)
        });
    }

    /**
     * Eliminar artista
     * @param {number} id - ID del artista
     * @returns {Promise} - Resultado de la eliminación
     */
    async eliminarArtista(id) {
        return this.request(`/artistas/${id}`, {
            method: 'DELETE'
        });
    }

    // ==================== RUTAS DE EVENTOS ====================
    
    /**
     * Obtener todos los eventos
     * @returns {Promise} - Lista de eventos
     */
    async obtenerEventos() {
        return this.request('/eventos');
    }

    /**
     * Obtener eventos próximos
     * @returns {Promise} - Lista de eventos próximos
     */
    async obtenerEventosProximos() {
        return this.request('/eventos/proximos');
    }

    /**
     * Obtener eventos por filtro
     * @param {Object} filtros - Filtros a aplicar
     * @returns {Promise} - Eventos filtrados
     */
    async obtenerEventosPorFiltro(filtros) {
        const queryParams = new URLSearchParams(filtros).toString();
        return this.request(`/eventos/filtro?${queryParams}`);
    }

    /**
     * Obtener eventos por municipio
     * @param {number} idMunicipio - ID del municipio
     * @returns {Promise} - Eventos del municipio
     */
    async obtenerEventosPorMunicipio(idMunicipio) {
        return this.request(`/eventos/municipio/${idMunicipio}`);
    }

    /**
     * Obtener eventos por estado
     * @param {number} idEstadoEvento - ID del estado del evento
     * @returns {Promise} - Eventos del estado
     */
    async obtenerEventosPorEstado(idEstadoEvento) {
        return this.request(`/eventos/estado/${idEstadoEvento}`);
    }

    /**
     * Obtener evento por ID
     * @param {number} id - ID del evento
     * @returns {Promise} - Evento encontrado
     */
    async obtenerEventoPorId(id) {
        return this.request(`/eventos/${id}`);
    }

    /**
     * Crear nuevo evento
     * @param {Object} evento - Datos del evento
     * @returns {Promise} - Evento creado
     */
    async crearEvento(evento) {
        return this.request('/eventos', {
            method: 'POST',
            body: JSON.stringify(evento)
        });
    }

    /**
     * Actualizar evento
     * @param {number} id - ID del evento
     * @param {Object} evento - Datos actualizados
     * @returns {Promise} - Evento actualizado
     */
    async actualizarEvento(id, evento) {
        return this.request(`/eventos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(evento)
        });
    }

    /**
     * Eliminar evento
     * @param {number} id - ID del evento
     * @returns {Promise} - Resultado de la eliminación
     */
    async eliminarEvento(id) {
        return this.request(`/eventos/${id}`, {
            method: 'DELETE'
        });
    }

    // ==================== RUTAS DE LOCALIDADES ====================
    
    /**
     * Obtener todas las localidades
     * @returns {Promise} - Lista de localidades
     */
    async obtenerLocalidades() {
        return this.request('/localidades');
    }

    /**
     * Buscar localidades por nombre
     * @param {string} nombre - Nombre a buscar
     * @returns {Promise} - Localidades encontradas
     */
    async buscarLocalidades(nombre) {
        return this.request(`/localidades/buscar?nombre=${encodeURIComponent(nombre)}`);
    }

    /**
     * Obtener localidad por ID
     * @param {number} id - ID de la localidad
     * @returns {Promise} - Localidad encontrada
     */
    async obtenerLocalidadPorId(id) {
        return this.request(`/localidades/${id}`);
    }

    /**
     * Crear nueva localidad
     * @param {Object} localidad - Datos de la localidad
     * @returns {Promise} - Localidad creada
     */
    async crearLocalidad(localidad) {
        return this.request('/localidades', {
            method: 'POST',
            body: JSON.stringify(localidad)
        });
    }

    /**
     * Actualizar localidad
     * @param {number} id - ID de la localidad
     * @param {Object} localidad - Datos actualizados
     * @returns {Promise} - Localidad actualizada
     */
    async actualizarLocalidad(id, localidad) {
        return this.request(`/localidades/${id}`, {
            method: 'PUT',
            body: JSON.stringify(localidad)
        });
    }

    /**
     * Eliminar localidad
     * @param {number} id - ID de la localidad
     * @returns {Promise} - Resultado de la eliminación
     */
    async eliminarLocalidad(id) {
        return this.request(`/localidades/${id}`, {
            method: 'DELETE'
        });
    }

    // ==================== RUTAS DE LOCALIDADES DETALLE ====================
    
    /**
     * Obtener todos los detalles de localidades
     * @returns {Promise} - Lista de detalles
     */
    async obtenerLocalidadesDetalle() {
        return this.request('/localidades-detalle');
    }

    /**
     * Obtener detalles disponibles
     * @returns {Promise} - Lista de detalles disponibles
     */
    async obtenerDetallesDisponibles() {
        return this.request('/localidades-detalle/disponibles');
    }

    /**
     * Obtener detalles por evento
     * @param {number} idEvento - ID del evento
     * @returns {Promise} - Detalles del evento
     */
    async obtenerDetallesPorEvento(idEvento) {
        return this.request(`/localidades-detalle/evento/${idEvento}`);
    }

    /**
     * Obtener detalles por localidad
     * @param {number} idLocalidad - ID de la localidad
     * @returns {Promise} - Detalles de la localidad
     */
    async obtenerDetallesPorLocalidad(idLocalidad) {
        return this.request(`/localidades-detalle/localidad/${idLocalidad}`);
    }

    /**
     * Obtener detalle por ID
     * @param {number} id - ID del detalle
     * @returns {Promise} - Detalle encontrado
     */
    async obtenerDetallePorId(id) {
        return this.request(`/localidades-detalle/${id}`);
    }

    /**
     * Crear nuevo detalle de localidad
     * @param {Object} detalle - Datos del detalle
     * @returns {Promise} - Detalle creado
     */
    async crearLocalidadDetalle(detalle) {
        return this.request('/localidades-detalle', {
            method: 'POST',
            body: JSON.stringify(detalle)
        });
    }

    /**
     * Actualizar detalle
     * @param {number} id - ID del detalle
     * @param {Object} detalle - Datos actualizados
     * @returns {Promise} - Detalle actualizado
     */
    async actualizarDetalle(id, detalle) {
        return this.request(`/localidades-detalle/${id}`, {
            method: 'PUT',
            body: JSON.stringify(detalle)
        });
    }

    /**
     * Actualizar cantidad disponible
     * @param {number} id - ID del detalle
     * @param {Object} cantidadData - Datos de la cantidad
     * @returns {Promise} - Resultado de la actualización
     */
    async actualizarCantidadDisponible(id, cantidadData) {
        return this.request(`/localidades-detalle/${id}/cantidad`, {
            method: 'PUT',
            body: JSON.stringify(cantidadData)
        });
    }

    /**
     * Eliminar detalle
     * @param {number} id - ID del detalle
     * @returns {Promise} - Resultado de la eliminación
     */
    async eliminarDetalle(id) {
        return this.request(`/localidades-detalle/${id}`, {
            method: 'DELETE'
        });
    }

    // ==================== RUTAS DE COMPRAS ====================
    
    /**
     * Obtener todas las compras
     * @returns {Promise} - Lista de compras
     */
    async obtenerCompras() {
        return this.request('/compras');
    }

    /**
     * Obtener compras por fecha
     * @param {string} fecha - Fecha en formato YYYY-MM-DD
     * @returns {Promise} - Compras de la fecha
     */
    async obtenerComprasPorFecha(fecha) {
        return this.request(`/compras/filtroFecha/${fecha}`);
    }

    /**
     * Registrar nueva compra
     * @param {Object} compra - Datos de la compra
     * @returns {Promise} - Compra registrada
     */
    async registrarCompra(compra) {
        return this.request('/compras', {
            method: 'POST',
            body: JSON.stringify(compra)
        });
    }

    // ==================== RUTAS DE ARTISTA-EVENTO ====================
    
    /**
     * Asociar artista con evento
     * @param {Object} asociacion - Datos de la asociación
     * @returns {Promise} - Asociación creada
     */
    async asociarArtistaEvento(asociacion) {
        return this.request('/artista-eventos', {
            method: 'POST',
            body: JSON.stringify(asociacion)
        });
    }

    // ==================== RUTAS DE INFORMACIÓN ====================
    
    /**
     * Obtener información de la API
     * @returns {Promise} - Información de la API
     */
    async obtenerInfoAPI() {
        return this.request('/info');
    }

    /**
     * Verificar salud de la API
     * @returns {Promise} - Estado de la API
     */
    async verificarSalud() {
        return this.request('/health');
    }
}

// Crear instancia global de la API
const api = new ApiRoutes();

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ApiRoutes;
}

// Hacer disponible globalmente en el navegador
if (typeof window !== 'undefined') {
    window.ApiRoutes = ApiRoutes;
    window.api = api;
}
