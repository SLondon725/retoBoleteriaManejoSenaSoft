/**
 * Configuración de la API para el frontend
 * Este archivo contiene la configuración base para conectar con el backend
 */

// Configuración de la API
const API_CONFIG = {
    // URL base del backend
    BASE_URL: 'http://localhost:3000/manejo_boleteria',
    
    // Configuración de timeout (en milisegundos)
    TIMEOUT: 30000,
    
    // Headers por defecto
    DEFAULT_HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    
    // Configuración de reintentos
    RETRY_CONFIG: {
        maxRetries: 3,
        retryDelay: 1000, // 1 segundo
        retryOn: [408, 429, 500, 502, 503, 504] // Códigos de error para reintentar
    },
    
    // Configuración de caché
    CACHE_CONFIG: {
        enabled: true,
        ttl: 300000, // 5 minutos en milisegundos
        maxSize: 100 // Máximo número de elementos en caché
    }
};

// Configuración de endpoints específicos
const ENDPOINTS = {
    // Autenticación
    AUTH: {
        LOGIN: '/auth/login'
    },
    
    // Usuarios
    USUARIOS: {
        BASE: '/usuarios',
        BUSCAR: '/usuarios/buscar',
        CORREO: '/usuarios/correo',
        ROL: '/usuarios/rol',
        VERIFICAR_CREDENCIALES: '/usuarios/verificar-credenciales',
        PASSWORD: '/usuarios/password'
    },
    
    // Roles
    ROLES: {
        BASE: '/roles',
        BUSCAR: '/roles/buscar',
        USUARIOS: '/roles/usuarios'
    },
    
    // Artistas
    ARTISTAS: {
        BASE: '/artistas',
        GENERO: '/artistas/genero',
        MUNICIPIO: '/artistas/municipio'
    },
    
    // Eventos
    EVENTOS: {
        BASE: '/eventos',
        PROXIMOS: '/eventos/proximos',
        FILTRO: '/eventos/filtro',
        MUNICIPIO: '/eventos/municipio',
        ESTADO: '/eventos/estado'
    },
    
    // Localidades
    LOCALIDADES: {
        BASE: '/localidades',
        BUSCAR: '/localidades/buscar'
    },
    
    // Localidades Detalle
    LOCALIDADES_DETALLE: {
        BASE: '/localidades-detalle',
        DISPONIBLES: '/localidades-detalle/disponibles',
        EVENTO: '/localidades-detalle/evento',
        LOCALIDAD: '/localidades-detalle/localidad',
        CANTIDAD: '/localidades-detalle/cantidad'
    },
    
    // Compras
    COMPRAS: {
        BASE: '/compras',
        FILTRO_FECHA: '/compras/filtroFecha'
    },
    
    // Artista-Evento
    ARTISTA_EVENTO: {
        BASE: '/artista-eventos'
    },
    
    // Información
    INFO: {
        API: '/info',
        HEALTH: '/health'
    }
};

// Configuración de mensajes de error
const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Error de conexión. Verifique su conexión a internet.',
    TIMEOUT_ERROR: 'La petición tardó demasiado tiempo en responder.',
    UNAUTHORIZED: 'No tiene permisos para realizar esta acción.',
    FORBIDDEN: 'Acceso denegado.',
    NOT_FOUND: 'El recurso solicitado no fue encontrado.',
    SERVER_ERROR: 'Error interno del servidor.',
    VALIDATION_ERROR: 'Los datos enviados no son válidos.',
    UNKNOWN_ERROR: 'Ha ocurrido un error inesperado.'
};

// Configuración de códigos de estado HTTP
const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504
};

// Configuración de tipos de datos
const DATA_TYPES = {
    USUARIO: {
        REQUIRED_FIELDS: ['numIdentificacion', 'nombre', 'apellido', 'correo', 'idRol', 'password'],
        OPTIONAL_FIELDS: ['telefono', 'direccion']
    },
    ARTISTA: {
        REQUIRED_FIELDS: ['nombre', 'apellido', 'nombreArtistico', 'idGeneroMusical', 'idMunicipio'],
        OPTIONAL_FIELDS: ['biografia', 'fechaNacimiento', 'redesSociales']
    },
    EVENTO: {
        REQUIRED_FIELDS: ['nombre', 'fechaInicio', 'fechaFin', 'idLocalidad', 'idEstadoEvento'],
        OPTIONAL_FIELDS: ['descripcion', 'precioBase', 'imagen']
    },
    LOCALIDAD: {
        REQUIRED_FIELDS: ['nombre', 'direccion', 'capacidad', 'idMunicipio'],
        OPTIONAL_FIELDS: ['descripcion']
    },
    LOCALIDAD_DETALLE: {
        REQUIRED_FIELDS: ['idLocalidad', 'idEvento', 'nombre', 'precio', 'cantidadDisponible'],
        OPTIONAL_FIELDS: ['descripcion']
    },
    COMPRA: {
        REQUIRED_FIELDS: ['idUsuario', 'idLocalidadDetalle', 'cantidad', 'precioTotal', 'idMetodoPago', 'idEstadoTransaccion'],
        OPTIONAL_FIELDS: ['fechaCompra', 'observaciones']
    }
};

// Configuración de validaciones
const VALIDATIONS = {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^[0-9]{10}$/,
    ID_REGEX: /^[0-9]{8,12}$/,
    PASSWORD_MIN_LENGTH: 6,
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 50
};

// Configuración de formatos de fecha
const DATE_FORMATS = {
    API: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
    DISPLAY: 'DD/MM/YYYY HH:mm',
    DATE_ONLY: 'DD/MM/YYYY',
    TIME_ONLY: 'HH:mm'
};

// Configuración de paginación
const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100
};

// Configuración de ordenamiento
const SORT_OPTIONS = {
    ASC: 'ASC',
    DESC: 'DESC'
};

// Configuración de filtros comunes
const FILTERS = {
    DATE_RANGE: {
        START_DATE: 'fechaInicio',
        END_DATE: 'fechaFin'
    },
    STATUS: {
        ACTIVE: 'activo',
        INACTIVE: 'inactivo'
    },
    EVENT_STATUS: {
        SCHEDULED: 'programado',
        IN_PROGRESS: 'en_curso',
        COMPLETED: 'completado',
        CANCELLED: 'cancelado'
    }
};

// Función para obtener la configuración completa
function getApiConfig() {
    return {
        ...API_CONFIG,
        endpoints: ENDPOINTS,
        errorMessages: ERROR_MESSAGES,
        httpStatus: HTTP_STATUS,
        dataTypes: DATA_TYPES,
        validations: VALIDATIONS,
        dateFormats: DATE_FORMATS,
        pagination: PAGINATION,
        sortOptions: SORT_OPTIONS,
        filters: FILTERS
    };
}

// Función para validar configuración
function validateConfig() {
    const config = getApiConfig();
    const errors = [];

    // Validar URL base
    if (!config.BASE_URL || !config.BASE_URL.startsWith('http')) {
        errors.push('BASE_URL debe ser una URL válida que comience con http');
    }

    // Validar timeout
    if (config.TIMEOUT < 1000) {
        errors.push('TIMEOUT debe ser al menos 1000ms');
    }

    // Validar configuración de reintentos
    if (config.RETRY_CONFIG.maxRetries < 0) {
        errors.push('maxRetries debe ser un número positivo');
    }

    if (config.RETRY_CONFIG.retryDelay < 100) {
        errors.push('retryDelay debe ser al menos 100ms');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Función para obtener endpoint completo
function getFullEndpoint(endpoint) {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
}

// Función para obtener headers con autenticación
function getAuthHeaders(token = null) {
    const headers = { ...API_CONFIG.DEFAULT_HEADERS };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    } else if (typeof window !== 'undefined' && window.localStorage) {
        const storedToken = window.localStorage.getItem('authToken');
        if (storedToken) {
            headers['Authorization'] = `Bearer ${storedToken}`;
        }
    }
    
    return headers;
}

// Función para formatear fecha para la API
function formatDateForAPI(date) {
    if (date instanceof Date) {
        return date.toISOString();
    }
    if (typeof date === 'string') {
        return new Date(date).toISOString();
    }
    return date;
}

// Función para formatear fecha para mostrar
function formatDateForDisplay(date, format = DATE_FORMATS.DISPLAY) {
    if (!date) return '';
    
    const dateObj = date instanceof Date ? date : new Date(date);
    
    switch (format) {
        case DATE_FORMATS.DISPLAY:
            return dateObj.toLocaleString('es-CO');
        case DATE_FORMATS.DATE_ONLY:
            return dateObj.toLocaleDateString('es-CO');
        case DATE_FORMATS.TIME_ONLY:
            return dateObj.toLocaleTimeString('es-CO');
        default:
            return dateObj.toLocaleString('es-CO');
    }
}

// Función para validar email
function isValidEmail(email) {
    return VALIDATIONS.EMAIL_REGEX.test(email);
}

// Función para validar teléfono
function isValidPhone(phone) {
    return VALIDATIONS.PHONE_REGEX.test(phone);
}

// Función para validar ID
function isValidId(id) {
    return VALIDATIONS.ID_REGEX.test(id);
}

// Función para validar contraseña
function isValidPassword(password) {
    return password && password.length >= VALIDATIONS.PASSWORD_MIN_LENGTH;
}

// Función para validar nombre
function isValidName(name) {
    return name && 
           name.length >= VALIDATIONS.NAME_MIN_LENGTH && 
           name.length <= VALIDATIONS.NAME_MAX_LENGTH;
}

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        API_CONFIG,
        ENDPOINTS,
        ERROR_MESSAGES,
        HTTP_STATUS,
        DATA_TYPES,
        VALIDATIONS,
        DATE_FORMATS,
        PAGINATION,
        SORT_OPTIONS,
        FILTERS,
        getApiConfig,
        validateConfig,
        getFullEndpoint,
        getAuthHeaders,
        formatDateForAPI,
        formatDateForDisplay,
        isValidEmail,
        isValidPhone,
        isValidId,
        isValidPassword,
        isValidName
    };
}

// Hacer disponible globalmente en el navegador
if (typeof window !== 'undefined') {
    window.ApiConfig = {
        API_CONFIG,
        ENDPOINTS,
        ERROR_MESSAGES,
        HTTP_STATUS,
        DATA_TYPES,
        VALIDATIONS,
        DATE_FORMATS,
        PAGINATION,
        SORT_OPTIONS,
        FILTERS,
        getApiConfig,
        validateConfig,
        getFullEndpoint,
        getAuthHeaders,
        formatDateForAPI,
        formatDateForDisplay,
        isValidEmail,
        isValidPhone,
        isValidId,
        isValidPassword,
        isValidName
    };
}
