/**
 * Utilidades para el manejo de la API
 * Este archivo contiene funciones auxiliares para facilitar el uso de las rutas de API
 */

/**
 * Clase de utilidades para la API
 */
class ApiUtils {
    constructor() {
        this.cache = new Map();
        this.pendingRequests = new Map();
    }

    /**
     * Debounce para evitar múltiples llamadas
     * @param {Function} func - Función a ejecutar
     * @param {number} delay - Tiempo de espera en ms
     * @returns {Function} - Función con debounce
     */
    debounce(func, delay = 300) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    /**
     * Throttle para limitar la frecuencia de llamadas
     * @param {Function} func - Función a ejecutar
     * @param {number} limit - Límite de tiempo en ms
     * @returns {Function} - Función con throttle
     */
    throttle(func, limit = 1000) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Retry automático para peticiones fallidas
     * @param {Function} fn - Función a ejecutar
     * @param {number} retries - Número de reintentos
     * @param {number} delay - Tiempo entre reintentos
     * @returns {Promise} - Resultado de la función
     */
    async retry(fn, retries = 3, delay = 1000) {
        try {
            return await fn();
        } catch (error) {
            if (retries > 0) {
                await this.sleep(delay);
                return this.retry(fn, retries - 1, delay * 2);
            }
            throw error;
        }
    }

    /**
     * Sleep para pausar la ejecución
     * @param {number} ms - Milisegundos a pausar
     * @returns {Promise} - Promise que se resuelve después del tiempo
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Cache simple para respuestas
     * @param {string} key - Clave del caché
     * @param {Function} fn - Función a ejecutar si no hay caché
     * @param {number} ttl - Tiempo de vida en ms
     * @returns {Promise} - Resultado de la función o caché
     */
    async cache(key, fn, ttl = 300000) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < ttl) {
            return cached.data;
        }

        const result = await fn();
        this.cache.set(key, {
            data: result,
            timestamp: Date.now()
        });

        return result;
    }

    /**
     * Limpiar caché
     * @param {string} key - Clave específica (opcional)
     */
    clearCache(key = null) {
        if (key) {
            this.cache.delete(key);
        } else {
            this.cache.clear();
        }
    }

    /**
     * Formatear fecha para la API
     * @param {Date|string} date - Fecha a formatear
     * @returns {string} - Fecha en formato ISO
     */
    formatDateForAPI(date) {
        if (!date) return null;
        
        if (date instanceof Date) {
            return date.toISOString();
        }
        
        if (typeof date === 'string') {
            return new Date(date).toISOString();
        }
        
        return date;
    }

    /**
     * Formatear fecha para mostrar
     * @param {Date|string} date - Fecha a formatear
     * @param {string} locale - Locale para formateo
     * @returns {string} - Fecha formateada
     */
    formatDateForDisplay(date, locale = 'es-CO') {
        if (!date) return '';
        
        const dateObj = date instanceof Date ? date : new Date(date);
        return dateObj.toLocaleString(locale);
    }

    /**
     * Validar email
     * @param {string} email - Email a validar
     * @returns {boolean} - True si es válido
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validar teléfono colombiano
     * @param {string} phone - Teléfono a validar
     * @returns {boolean} - True si es válido
     */
    isValidPhone(phone) {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    }

    /**
     * Validar cédula colombiana
     * @param {string} id - Cédula a validar
     * @returns {boolean} - True si es válida
     */
    isValidId(id) {
        const idRegex = /^[0-9]{8,12}$/;
        return idRegex.test(id);
    }

    /**
     * Validar contraseña
     * @param {string} password - Contraseña a validar
     * @param {number} minLength - Longitud mínima
     * @returns {boolean} - True si es válida
     */
    isValidPassword(password, minLength = 6) {
        return password && password.length >= minLength;
    }

    /**
     * Generar ID único
     * @returns {string} - ID único
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    /**
     * Capitalizar primera letra
     * @param {string} str - String a capitalizar
     * @returns {string} - String capitalizado
     */
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    /**
     * Formatear moneda colombiana
     * @param {number} amount - Cantidad a formatear
     * @returns {string} - Cantidad formateada
     */
    formatCurrency(amount) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP'
        }).format(amount);
    }

    /**
     * Formatear número con separadores
     * @param {number} number - Número a formatear
     * @returns {string} - Número formateado
     */
    formatNumber(number) {
        return new Intl.NumberFormat('es-CO').format(number);
    }

    /**
     * Obtener parámetros de URL
     * @param {string} url - URL a analizar
     * @returns {Object} - Parámetros como objeto
     */
    getUrlParams(url = window.location.href) {
        const params = new URLSearchParams(new URL(url).search);
        const result = {};
        
        for (const [key, value] of params) {
            result[key] = value;
        }
        
        return result;
    }

    /**
     * Construir URL con parámetros
     * @param {string} baseUrl - URL base
     * @param {Object} params - Parámetros
     * @returns {string} - URL construida
     */
    buildUrl(baseUrl, params = {}) {
        const url = new URL(baseUrl);
        
        Object.keys(params).forEach(key => {
            if (params[key] !== null && params[key] !== undefined) {
                url.searchParams.append(key, params[key]);
            }
        });
        
        return url.toString();
    }

    /**
     * Mostrar notificación
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo de notificación (success, error, warning, info)
     * @param {number} duration - Duración en ms
     */
    showNotification(message, type = 'info', duration = 3000) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos básicos
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        // Colores según tipo
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Remover después del tiempo especificado
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, duration);
    }

    /**
     * Mostrar loading
     * @param {boolean} show - Mostrar o ocultar
     * @param {string} message - Mensaje del loading
     */
    showLoading(show = true, message = 'Cargando...') {
        let loading = document.getElementById('api-loading');
        
        if (show) {
            if (!loading) {
                loading = document.createElement('div');
                loading.id = 'api-loading';
                loading.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                `;
                
                const spinner = document.createElement('div');
                spinner.style.cssText = `
                    background-color: white;
                    padding: 20px;
                    border-radius: 10px;
                    text-align: center;
                `;
                
                spinner.innerHTML = `
                    <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 10px;"></div>
                    <div>${message}</div>
                `;
                
                // Agregar CSS para animación
                if (!document.getElementById('loading-styles')) {
                    const style = document.createElement('style');
                    style.id = 'loading-styles';
                    style.textContent = `
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                loading.appendChild(spinner);
                document.body.appendChild(loading);
            }
        } else {
            if (loading) {
                loading.remove();
            }
        }
    }

    /**
     * Manejar errores de forma consistente
     * @param {Error} error - Error a manejar
     * @param {string} context - Contexto del error
     */
    handleError(error, context = 'Operación') {
        console.error(`Error en ${context}:`, error);
        
        let message = 'Ha ocurrido un error inesperado';
        
        if (error.message) {
            message = error.message;
        } else if (error.response) {
            message = error.response.data?.message || 'Error del servidor';
        }
        
        this.showNotification(`${context}: ${message}`, 'error');
    }

    /**
     * Validar formulario
     * @param {HTMLFormElement} form - Formulario a validar
     * @param {Object} rules - Reglas de validación
     * @returns {Object} - Resultado de la validación
     */
    validateForm(form, rules = {}) {
        const errors = {};
        const data = {};
        
        // Obtener datos del formulario
        const formData = new FormData(form);
        for (const [key, value] of formData) {
            data[key] = value;
        }
        
        // Aplicar reglas de validación
        Object.keys(rules).forEach(field => {
            const rule = rules[field];
            const value = data[field];
            
            if (rule.required && (!value || value.trim() === '')) {
                errors[field] = `${rule.label || field} es requerido`;
            } else if (value) {
                if (rule.type === 'email' && !this.isValidEmail(value)) {
                    errors[field] = `${rule.label || field} debe ser un email válido`;
                } else if (rule.type === 'phone' && !this.isValidPhone(value)) {
                    errors[field] = `${rule.label || field} debe ser un teléfono válido`;
                } else if (rule.type === 'id' && !this.isValidId(value)) {
                    errors[field] = `${rule.label || field} debe ser una cédula válida`;
                } else if (rule.minLength && value.length < rule.minLength) {
                    errors[field] = `${rule.label || field} debe tener al menos ${rule.minLength} caracteres`;
                } else if (rule.maxLength && value.length > rule.maxLength) {
                    errors[field] = `${rule.label || field} no puede tener más de ${rule.maxLength} caracteres`;
                }
            }
        });
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors,
            data
        };
    }

    /**
     * Mostrar errores de formulario
     * @param {Object} errors - Errores a mostrar
     */
    showFormErrors(errors) {
        // Limpiar errores anteriores
        document.querySelectorAll('.field-error').forEach(el => el.remove());
        
        // Mostrar nuevos errores
        Object.keys(errors).forEach(field => {
            const input = document.querySelector(`[name="${field}"]`);
            if (input) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'field-error';
                errorDiv.style.cssText = 'color: red; font-size: 12px; margin-top: 5px;';
                errorDiv.textContent = errors[field];
                
                input.parentNode.appendChild(errorDiv);
            }
        });
    }

    /**
     * Limpiar errores de formulario
     */
    clearFormErrors() {
        document.querySelectorAll('.field-error').forEach(el => el.remove());
    }

    /**
     * Obtener datos de localStorage
     * @param {string} key - Clave
     * @param {*} defaultValue - Valor por defecto
     * @returns {*} - Valor almacenado o valor por defecto
     */
    getStorage(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.error('Error al obtener datos de localStorage:', error);
            return defaultValue;
        }
    }

    /**
     * Guardar datos en localStorage
     * @param {string} key - Clave
     * @param {*} value - Valor a guardar
     */
    setStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error al guardar datos en localStorage:', error);
        }
    }

    /**
     * Remover datos de localStorage
     * @param {string} key - Clave
     */
    removeStorage(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error al remover datos de localStorage:', error);
        }
    }

    /**
     * Verificar si el usuario está autenticado
     * @returns {boolean} - True si está autenticado
     */
    isAuthenticated() {
        return this.getStorage('authToken') !== null;
    }

    /**
     * Obtener token de autenticación
     * @returns {string|null} - Token o null
     */
    getAuthToken() {
        return this.getStorage('authToken');
    }

    /**
     * Cerrar sesión
     */
    logout() {
        this.removeStorage('authToken');
        this.removeStorage('userData');
        this.showNotification('Sesión cerrada', 'info');
    }
}

// Crear instancia global
const apiUtils = new ApiUtils();

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ApiUtils;
}

// Hacer disponible globalmente en el navegador
if (typeof window !== 'undefined') {
    window.ApiUtils = ApiUtils;
    window.apiUtils = apiUtils;
}
