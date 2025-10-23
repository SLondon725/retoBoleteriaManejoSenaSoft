# Documentación de Rutas de API - Sistema de Boletería

## Configuración Base

- **URL Base**: `http://localhost:3000/manejo_boleteria`
- **Puerto**: 3000
- **Protocolo**: HTTP
- **Formato de datos**: JSON

## Estructura de Respuesta

Todas las respuestas de la API siguen el siguiente formato:

```json
{
    "success": true,
    "message": "Mensaje descriptivo",
    "data": { ... },
    "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Rutas Disponibles

### 1. Autenticación

#### POST `/auth/login`
Inicia sesión de usuario.

**Parámetros:**
- `id` (string): ID del usuario
- `password` (string): Contraseña

**Ejemplo:**
```javascript
const resultado = await api.login('12345678', 'password123');
```

### 2. Usuarios

#### GET `/usuarios`
Obtiene todos los usuarios.

#### GET `/usuarios/buscar?nombre=valor`
Busca usuarios por nombre.

#### GET `/usuarios/correo/:correo`
Obtiene usuario por correo electrónico.

#### GET `/usuarios/rol/:idRol`
Obtiene usuarios por rol.

#### GET `/usuarios/:numIdentificacion`
Obtiene usuario por número de identificación.

#### POST `/usuarios`
Crea un nuevo usuario.

**Parámetros requeridos:**
- `numIdentificacion` (string)
- `nombre` (string)
- `apellido` (string)
- `correo` (string)
- `idRol` (number)
- `password` (string)

#### POST `/usuarios/verificar-credenciales`
Verifica credenciales de usuario.

#### PUT `/usuarios/:numIdentificacion`
Actualiza un usuario.

#### PUT `/usuarios/:numIdentificacion/password`
Cambia la contraseña de un usuario.

#### DELETE `/usuarios/:numIdentificacion`
Elimina un usuario.

### 3. Roles

#### GET `/roles`
Obtiene todos los roles.

#### GET `/roles/buscar?nombre=valor`
Busca roles por nombre.

#### GET `/roles/:id`
Obtiene rol por ID.

#### GET `/roles/:idRol/usuarios`
Obtiene usuarios por rol.

#### POST `/roles`
Crea un nuevo rol.

#### PUT `/roles/:id`
Actualiza un rol.

#### DELETE `/roles/:id`
Elimina un rol.

### 4. Artistas

#### GET `/artistas`
Obtiene todos los artistas.

#### GET `/artistas/genero/:idGeneroMusical`
Obtiene artistas por género musical.

#### GET `/artistas/municipio/:idMunicipio`
Obtiene artistas por municipio.

#### GET `/artistas/:id`
Obtiene artista por ID.

#### POST `/artistas`
Crea un nuevo artista.

**Parámetros requeridos:**
- `nombre` (string)
- `apellido` (string)
- `nombreArtistico` (string)
- `idGeneroMusical` (number)
- `idMunicipio` (number)

#### PUT `/artistas/:id`
Actualiza un artista.

#### DELETE `/artistas/:id`
Elimina un artista.

### 5. Eventos

#### GET `/eventos`
Obtiene todos los eventos.

#### GET `/eventos/proximos`
Obtiene eventos próximos.

#### GET `/eventos/filtro?parametros`
Obtiene eventos por filtros.

**Parámetros de filtro:**
- `municipio` (number): ID del municipio
- `estado` (number): ID del estado del evento
- `fechaInicio` (string): Fecha de inicio (YYYY-MM-DD)
- `fechaFin` (string): Fecha de fin (YYYY-MM-DD)

#### GET `/eventos/municipio/:idMunicipio`
Obtiene eventos por municipio.

#### GET `/eventos/estado/:idEstadoEvento`
Obtiene eventos por estado.

#### GET `/eventos/:id`
Obtiene evento por ID.

#### POST `/eventos`
Crea un nuevo evento.

**Parámetros requeridos:**
- `nombre` (string)
- `fechaInicio` (string): Formato ISO 8601
- `fechaFin` (string): Formato ISO 8601
- `idLocalidad` (number)
- `idEstadoEvento` (number)

#### PUT `/eventos/:id`
Actualiza un evento.

#### DELETE `/eventos/:id`
Elimina un evento.

### 6. Localidades

#### GET `/localidades`
Obtiene todas las localidades.

#### GET `/localidades/buscar?nombre=valor`
Busca localidades por nombre.

#### GET `/localidades/:id`
Obtiene localidad por ID.

#### POST `/localidades`
Crea una nueva localidad.

**Parámetros requeridos:**
- `nombre` (string)
- `direccion` (string)
- `capacidad` (number)
- `idMunicipio` (number)

#### PUT `/localidades/:id`
Actualiza una localidad.

#### DELETE `/localidades/:id`
Elimina una localidad.

### 7. Localidades Detalle

#### GET `/localidades-detalle`
Obtiene todos los detalles de localidades.

#### GET `/localidades-detalle/disponibles`
Obtiene detalles disponibles.

#### GET `/localidades-detalle/evento/:idEvento`
Obtiene detalles por evento.

#### GET `/localidades-detalle/localidad/:idLocalidad`
Obtiene detalles por localidad.

#### GET `/localidades-detalle/:id`
Obtiene detalle por ID.

#### POST `/localidades-detalle`
Crea un nuevo detalle de localidad.

**Parámetros requeridos:**
- `idLocalidad` (number)
- `idEvento` (number)
- `nombre` (string)
- `precio` (number)
- `cantidadDisponible` (number)

#### PUT `/localidades-detalle/:id`
Actualiza un detalle.

#### PUT `/localidades-detalle/:id/cantidad`
Actualiza la cantidad disponible.

#### DELETE `/localidades-detalle/:id`
Elimina un detalle.

### 8. Compras

#### GET `/compras`
Obtiene todas las compras.

#### GET `/compras/filtroFecha/:fecha`
Obtiene compras por fecha (formato: YYYY-MM-DD).

#### POST `/compras`
Registra una nueva compra.

**Parámetros requeridos:**
- `idUsuario` (string)
- `idLocalidadDetalle` (number)
- `cantidad` (number)
- `precioTotal` (number)
- `idMetodoPago` (number)
- `idEstadoTransaccion` (number)

### 9. Artista-Evento

#### POST `/artista-eventos`
Asocia un artista con un evento.

**Parámetros requeridos:**
- `idArtista` (number)
- `idEvento` (number)

### 10. Información

#### GET `/info`
Obtiene información de la API.

#### GET `/health`
Verifica el estado de la API.

## Códigos de Estado HTTP

- **200**: OK - Petición exitosa
- **201**: Created - Recurso creado exitosamente
- **400**: Bad Request - Datos inválidos
- **401**: Unauthorized - No autenticado
- **403**: Forbidden - Sin permisos
- **404**: Not Found - Recurso no encontrado
- **422**: Unprocessable Entity - Error de validación
- **500**: Internal Server Error - Error del servidor

## Ejemplos de Uso

### Incluir archivos en HTML

```html
<!DOCTYPE html>
<html>
<head>
    <title>Sistema de Boletería</title>
</head>
<body>
    <!-- Incluir archivos de API -->
    <script src="js/api-config.js"></script>
    <script src="js/api-routes.js"></script>
    <script src="js/api-examples.js"></script>
    
    <script>
        // Ejemplo de uso
        async function cargarEventos() {
            try {
                const eventos = await api.obtenerEventos();
                console.log('Eventos:', eventos);
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
        
        // Llamar función al cargar la página
        document.addEventListener('DOMContentLoaded', cargarEventos);
    </script>
</body>
</html>
```

### Ejemplo de Login

```javascript
async function iniciarSesion() {
    const id = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    
    try {
        const resultado = await api.login(id, password);
        
        if (resultado.success) {
            // Guardar token
            localStorage.setItem('authToken', resultado.data.token);
            
            // Redirigir al dashboard
            window.location.href = 'dashboard.html';
        }
    } catch (error) {
        alert('Error al iniciar sesión: ' + error.message);
    }
}
```

### Ejemplo de Crear Evento

```javascript
async function crearEvento() {
    const evento = {
        nombre: 'Concierto de Rock',
        descripcion: 'Concierto de música rock',
        fechaInicio: '2024-12-25T20:00:00Z',
        fechaFin: '2024-12-25T23:00:00Z',
        idLocalidad: 1,
        idEstadoEvento: 1,
        precioBase: 50000
    };
    
    try {
        const resultado = await api.crearEvento(evento);
        console.log('Evento creado:', resultado);
    } catch (error) {
        console.error('Error al crear evento:', error.message);
    }
}
```

### Ejemplo de Registrar Compra

```javascript
async function comprarBoleto() {
    const compra = {
        idUsuario: '12345678',
        idLocalidadDetalle: 1,
        cantidad: 2,
        precioTotal: 100000,
        idMetodoPago: 1,
        idEstadoTransaccion: 1
    };
    
    try {
        const resultado = await api.registrarCompra(compra);
        console.log('Compra registrada:', resultado);
        alert('Compra realizada exitosamente');
    } catch (error) {
        console.error('Error al registrar compra:', error.message);
        alert('Error al realizar la compra');
    }
}
```

## Validaciones

### Email
```javascript
if (!ApiConfig.isValidEmail('usuario@email.com')) {
    alert('Email inválido');
}
```

### Teléfono
```javascript
if (!ApiConfig.isValidPhone('3001234567')) {
    alert('Teléfono inválido');
}
```

### ID
```javascript
if (!ApiConfig.isValidId('12345678')) {
    alert('ID inválido');
}
```

## Manejo de Errores

```javascript
async function operacionConError() {
    try {
        const resultado = await api.obtenerEventos();
        // Procesar resultado
    } catch (error) {
        // Manejar diferentes tipos de error
        if (error.message.includes('401')) {
            // Usuario no autenticado
            window.location.href = 'login.html';
        } else if (error.message.includes('404')) {
            // Recurso no encontrado
            alert('El recurso solicitado no existe');
        } else {
            // Error genérico
            alert('Ha ocurrido un error: ' + error.message);
        }
    }
}
```

## Configuración de CORS

El backend está configurado para permitir conexiones desde cualquier origen. Si necesitas configurar CORS específicamente, modifica el archivo `Backend/manejo_boleteria/src/index.ts`.

## Notas Importantes

1. **Autenticación**: Algunas rutas pueden requerir autenticación. El token se envía automáticamente en los headers.

2. **Formato de fechas**: Las fechas deben enviarse en formato ISO 8601 (YYYY-MM-DDTHH:mm:ss.SSSZ).

3. **Validación**: Siempre valida los datos antes de enviarlos a la API.

4. **Manejo de errores**: Implementa manejo de errores apropiado para mejorar la experiencia del usuario.

5. **Caché**: La configuración incluye caché para mejorar el rendimiento.

## Soporte

Para soporte técnico o reportar problemas, contacta al equipo de desarrollo.
