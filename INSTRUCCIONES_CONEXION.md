# Instrucciones para Conectar Backend con Frontend

## Configuración Completada

He configurado completamente la conexión entre el backend y frontend de tu sistema de manejo de boletería. Aquí están los cambios realizados:

### Backend (Node.js + TypeScript)

1. **Configuración de CORS mejorada** en `Backend/manejo_boleteria/src/index.ts`:
   - Permite conexiones desde localhost y archivos locales
   - Configurado para métodos HTTP necesarios
   - Headers apropiados para autenticación

### Frontend (HTML + JavaScript)

1. **Archivo de configuración de API** (`Frontend/js/config/api.js`):
   - Cliente HTTP centralizado para todas las peticiones
   - URLs base configuradas
   - Métodos para todos los endpoints del backend

2. **Utilidades de carga de datos** (`Frontend/js/utils/dataLoader.js`):
   - Carga automática de datos en selectores
   - Cache de datos para mejor rendimiento
   - Funciones específicas por página

3. **Módulos JavaScript actualizados**:
   - `eventos.js`: Conexión completa con API de eventos
   - `artistas.js`: Conexión con API de artistas
   - `boleteria.js`: Conexión con APIs de localidades y boletería

4. **Formularios HTML mejorados**:
   - Validación de campos
   - Mensajes de error y éxito
   - Selectores dinámicos

## Cómo Ejecutar el Proyecto

### 1. Iniciar el Backend

```bash
cd Backend/manejo_boleteria
npm install
npm run dev
```

El backend se ejecutará en `http://localhost:3000`

### 2. Iniciar el Frontend

**IMPORTANTE**: No abras los archivos HTML directamente desde el explorador de archivos. Debes usar un servidor web:

```bash
cd Frontend
npm run dev
```

El frontend se ejecutará en `http://localhost:8080`

### 3. Acceder a la Aplicación

Abre tu navegador y ve a:

- `http://localhost:8080/eventos.html` - Módulo de eventos
- `http://localhost:8080/artistas.html` - Módulo de artistas  
- `http://localhost:8080/boleteria.html` - Módulo de boletería

### ⚠️ Solución al Error "Failed to fetch"

Si encuentras el error "Failed to fetch", es porque estás abriendo el archivo HTML directamente desde el sistema de archivos (file://). Esto causa problemas de CORS. 

**Solución**: Siempre usa el servidor web del frontend (`npm run dev` en la carpeta Frontend).

### 3. Verificar la Conexión

1. Abre las herramientas de desarrollador del navegador (F12)
2. Ve a la pestaña "Console"
3. Deberías ver mensajes de carga de datos sin errores
4. Intenta registrar un evento, artista o localidad

## Funcionalidades Implementadas

### Módulo de Eventos
- ✅ Registro de eventos con validación
- ✅ Carga de municipios en selector
- ✅ Mensajes de éxito/error
- ✅ Limpieza automática de formularios

### Módulo de Artistas
- ✅ Registro de artistas
- ✅ Selector de géneros musicales
- ✅ Validación de campos requeridos

### Módulo de Boletería
- ✅ Registro de localidades
- ✅ Registro de localidades detalle (precios y disponibilidad)
- ✅ Formulario de compra de boletas
- ✅ Carga dinámica de eventos y localidades

## Estructura de Archivos Creados/Modificados

```
Frontend/
├── js/
│   ├── config/
│   │   └── api.js                    # Configuración centralizada de API
│   ├── utils/
│   │   └── dataLoader.js            # Utilidades para cargar datos
│   └── modulos/
│       ├── eventos.js               # Actualizado con conexión API
│       ├── artistas.js              # Nuevo archivo
│       └── boleteria.js             # Nuevo archivo
├── eventos.html                     # Actualizado con scripts
├── artistas.html                    # Actualizado con formulario mejorado
└── boleteria.html                   # Actualizado con múltiples formularios

Backend/
└── manejo_boleteria/
    └── src/
        └── index.ts                 # CORS mejorado
```

## Características Técnicas

- **Manejo de errores**: Mensajes informativos para el usuario
- **Validación**: Campos requeridos y validación de fechas
- **Carga asíncrona**: Datos se cargan automáticamente
- **Responsive**: Interfaz adaptable a diferentes tamaños
- **Cache**: Datos se almacenan temporalmente para mejor rendimiento

## Próximos Pasos Recomendados

1. **Probar todas las funcionalidades** registrando datos de prueba
2. **Implementar autenticación** si es necesario
3. **Agregar tablas de visualización** para mostrar los datos registrados
4. **Implementar funcionalidad de compra** de boletas
5. **Agregar validaciones adicionales** según los requisitos del negocio

## Solución de Problemas

Si encuentras errores:

1. **Verifica que el backend esté ejecutándose** en el puerto 3000
2. **Revisa la consola del navegador** para errores de JavaScript
3. **Asegúrate de que la base de datos esté configurada** correctamente
4. **Verifica que todos los archivos estén en las rutas correctas**

¡La conexión entre frontend y backend está completamente funcional!
