// Configuración de la API
const API_CONFIG = {
    BASE_URL: 'http://localhost:3000/manejo_boleteria',
    ENDPOINTS: {
        // Autenticación
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        
        // Usuarios
        USUARIOS: '/usuarios',
        
        // Eventos
        EVENTOS: '/eventos',
        EVENTOS_PROXIMOS: '/eventos/proximos',
        EVENTOS_MUNICIPIO: '/eventos/municipio',
        EVENTOS_ESTADO: '/eventos/estado',
        
        // Artistas
        ARTISTAS: '/artistas',
        
        // Localidades
        LOCALIDADES: '/localidades',
        LOCALIDADES_DETALLE: '/localidades-detalle',
        
        // Roles
        ROLES: '/roles',
        
        // Health check
        HEALTH: '/health',
        INFO: '/info'
    }
};

// Función para hacer peticiones HTTP
class ApiClient {
    constructor() {
        this.baseURL = API_CONFIG.BASE_URL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            mode: 'cors',
        };

        const config = { ...defaultOptions, ...options };
        
        console.log('Realizando petición a:', url);
        console.log('Configuración:', config);
        
        try {
            const response = await fetch(url, config);
            
            console.log('Respuesta recibida:', response.status, response.statusText);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error del servidor:', errorText);
                throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
            }
            
            const data = await response.json();
            console.log('Datos recibidos:', data);
            return data;
        } catch (error) {
            console.error('Error en la petición:', error);
            console.error('URL intentada:', url);
            console.error('Tipo de error:', error.name);
            console.error('Mensaje de error:', error.message);
            throw error;
        }
    }

    // Métodos para eventos
    async getEventos() {
        return this.request(API_CONFIG.ENDPOINTS.EVENTOS);
    }

    async getEventoById(id) {
        return this.request(`${API_CONFIG.ENDPOINTS.EVENTOS}/${id}`);
    }

    async createEvento(evento) {
        return this.request(API_CONFIG.ENDPOINTS.EVENTOS, {
            method: 'POST',
            body: JSON.stringify(evento)
        });
    }

    async updateEvento(id, evento) {
        return this.request(`${API_CONFIG.ENDPOINTS.EVENTOS}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(evento)
        });
    }

    async deleteEvento(id) {
        return this.request(`${API_CONFIG.ENDPOINTS.EVENTOS}/${id}`, {
            method: 'DELETE'
        });
    }

    async getEventosProximos() {
        return this.request(API_CONFIG.ENDPOINTS.EVENTOS_PROXIMOS);
    }

    async getEventosPorMunicipio(idMunicipio) {
        return this.request(`${API_CONFIG.ENDPOINTS.EVENTOS_MUNICIPIO}/${idMunicipio}`);
    }

    async getEventosPorEstado(idEstado) {
        return this.request(`${API_CONFIG.ENDPOINTS.EVENTOS_ESTADO}/${idEstado}`);
    }

    // Métodos para artistas
    async getArtistas() {
        return this.request(API_CONFIG.ENDPOINTS.ARTISTAS);
    }

    async getArtistaById(id) {
        return this.request(`${API_CONFIG.ENDPOINTS.ARTISTAS}/${id}`);
    }

    async createArtista(artista) {
        return this.request(API_CONFIG.ENDPOINTS.ARTISTAS, {
            method: 'POST',
            body: JSON.stringify(artista)
        });
    }

    async updateArtista(id, artista) {
        return this.request(`${API_CONFIG.ENDPOINTS.ARTISTAS}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(artista)
        });
    }

    async deleteArtista(id) {
        return this.request(`${API_CONFIG.ENDPOINTS.ARTISTAS}/${id}`, {
            method: 'DELETE'
        });
    }

    // Métodos para localidades
    async getLocalidades() {
        return this.request(API_CONFIG.ENDPOINTS.LOCALIDADES);
    }

    async createLocalidad(localidad) {
        return this.request(API_CONFIG.ENDPOINTS.LOCALIDADES, {
            method: 'POST',
            body: JSON.stringify(localidad)
        });
    }

    // Métodos para localidades detalle
    async getLocalidadesDetalle() {
        return this.request(API_CONFIG.ENDPOINTS.LOCALIDADES_DETALLE);
    }

    async createLocalidadDetalle(localidadDetalle) {
        return this.request(API_CONFIG.ENDPOINTS.LOCALIDADES_DETALLE, {
            method: 'POST',
            body: JSON.stringify(localidadDetalle)
        });
    }

    // Métodos para usuarios
    async getUsuarios() {
        return this.request(API_CONFIG.ENDPOINTS.USUARIOS);
    }

    async createUsuario(usuario) {
        return this.request(API_CONFIG.ENDPOINTS.USUARIOS, {
            method: 'POST',
            body: JSON.stringify(usuario)
        });
    }

    // Métodos para autenticación
    async login(credentials) {
        return this.request(API_CONFIG.ENDPOINTS.LOGIN, {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    }

    async register(userData) {
        return this.request(API_CONFIG.ENDPOINTS.REGISTER, {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    // Health check
    async healthCheck() {
        return this.request(API_CONFIG.ENDPOINTS.HEALTH);
    }

    async getApiInfo() {
        return this.request(API_CONFIG.ENDPOINTS.INFO);
    }
}

// Crear instancia global del cliente API
const apiClient = new ApiClient();

// Exportar para uso en otros archivos
window.apiClient = apiClient;
window.API_CONFIG = API_CONFIG;
