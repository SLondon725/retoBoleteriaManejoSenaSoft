// Utilidades para cargar datos en los selectores
class DataLoader {
    constructor() {
        this.cache = new Map();
    }

    // Cargar eventos en un selector
    async loadEventos(selectorId) {
        try {
            const response = await apiClient.getEventos();
            if (response.success) {
                const selector = document.getElementById(selectorId);
                if (selector) {
                    // Limpiar opciones existentes (excepto la primera)
                    selector.innerHTML = '<option value="">Seleccione un evento</option>';
                    
                    response.data.forEach(evento => {
                        const option = document.createElement('option');
                        option.value = evento.id;
                        option.textContent = `${evento.nombre} - ${new Date(evento.fechaInicio).toLocaleDateString()}`;
                        selector.appendChild(option);
                    });
                }
            }
        } catch (error) {
            console.error('Error al cargar eventos:', error);
        }
    }

    // Cargar localidades en un selector
    async loadLocalidades(selectorId) {
        try {
            const response = await apiClient.getLocalidades();
            if (response.success) {
                const selector = document.getElementById(selectorId);
                if (selector) {
                    // Limpiar opciones existentes (excepto la primera)
                    selector.innerHTML = '<option value="">Seleccione una localidad</option>';
                    
                    response.data.forEach(localidad => {
                        const option = document.createElement('option');
                        option.value = localidad.id;
                        option.textContent = localidad.nombre;
                        selector.appendChild(option);
                    });
                }
            }
        } catch (error) {
            console.error('Error al cargar localidades:', error);
        }
    }

    // Cargar artistas en un selector
    async loadArtistas(selectorId) {
        try {
            const response = await apiClient.getArtistas();
            if (response.success) {
                const selector = document.getElementById(selectorId);
                if (selector) {
                    // Limpiar opciones existentes (excepto la primera)
                    selector.innerHTML = '<option value="">Seleccione un artista</option>';
                    
                    response.data.forEach(artista => {
                        const option = document.createElement('option');
                        option.value = artista.id;
                        option.textContent = artista.nombre;
                        selector.appendChild(option);
                    });
                }
            }
        } catch (error) {
            console.error('Error al cargar artistas:', error);
        }
    }

    // Cargar municipios en un selector
    async loadMunicipios(selectorId) {
        // Por ahora, cargar municipios estáticos
        // En el futuro, esto se puede conectar con una API de municipios
        const municipios = [
            { id: 1, nombre: 'Pereira' },
            { id: 2, nombre: 'Dosquebradas' },
            { id: 3, nombre: 'Santa Rosa de Cabal' },
            { id: 4, nombre: 'Cartago' },
            { id: 5, nombre: 'La Virginia' }
        ];

        const selector = document.getElementById(selectorId);
        if (selector) {
            // Limpiar opciones existentes (excepto la primera)
            selector.innerHTML = '<option value="">Seleccione un municipio</option>';
            
            municipios.forEach(municipio => {
                const option = document.createElement('option');
                option.value = municipio.id;
                option.textContent = municipio.nombre;
                selector.appendChild(option);
            });
        }
    }

    // Cargar todos los datos necesarios para una página
    async loadAllData(pageType) {
        switch (pageType) {
            case 'eventos':
                await this.loadMunicipios('idMunicipio');
                break;
            case 'artistas':
                // No necesita cargar datos adicionales por ahora
                break;
            case 'boleteria':
                await Promise.all([
                    this.loadEventos('id_evento'),
                    this.loadEventos('boleteria_evento'),
                    this.loadLocalidades('id_localidad'),
                    this.loadLocalidades('boleteria_localidad')
                ]);
                break;
        }
    }

    // Función para actualizar localidades cuando cambia el evento
    async updateLocalidadesByEvento(eventoId, localidadSelectorId) {
        try {
            // Por ahora, cargar todas las localidades
            // En el futuro, se puede filtrar por evento
            await this.loadLocalidades(localidadSelectorId);
        } catch (error) {
            console.error('Error al actualizar localidades:', error);
        }
    }
}

// Crear instancia global del cargador de datos
const dataLoader = new DataLoader();

// Exportar para uso en otros archivos
window.dataLoader = dataLoader;
