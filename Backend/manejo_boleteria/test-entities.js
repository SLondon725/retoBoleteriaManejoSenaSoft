const { AppDataSource } = require('./dist/config/database');
const { Usuarios } = require('./dist/entities/Usuarios');
const { Artistas } = require('./dist/entities/Artistas');

async function testEntities() {
    try {
        console.log('🔍 Probando mapeo de entidades...');
        
        await AppDataSource.initialize();
        console.log('✅ Conexión a la base de datos establecida');

        // Probar Usuarios
        const usuarioRepo = AppDataSource.getRepository(Usuarios);
        
        console.log('\n📝 Probando inserción de Usuario...');
        const nuevoUsuario = {
            tipo_documento: 'CC',
            num_identificacion: '12345678',
            nombres: 'Juan',
            apellidos: 'Pérez',
            correo: 'juan@test.com',
            pass: 'password123',
            telefono: '3001234567',
            idRol: 1
        };

        console.log('Datos a insertar:', nuevoUsuario);
        
        // Verificar que los campos coinciden
        const usuario = usuarioRepo.create(nuevoUsuario);
        console.log('✅ Usuario creado correctamente:', usuario);

        // Probar Artistas
        const artistaRepo = AppDataSource.getRepository(Artistas);
        
        console.log('\n📝 Probando inserción de Artista...');
        const nuevoArtista = {
            nombres: 'Carlos',
            apellidos: 'Vives',
            idGeneroMusical: 1,
            idCiudadOrigen: 1
        };

        console.log('Datos a insertar:', nuevoArtista);
        
        const artista = artistaRepo.create(nuevoArtista);
        console.log('✅ Artista creado correctamente:', artista);

        console.log('\n🎉 ¡Mapeo de entidades funcionando correctamente!');

    } catch (error) {
        console.error('❌ Error durante la prueba:', error.message);
        console.error('Stack trace:', error.stack);
    } finally {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    }
}

// Ejecutar prueba
testEntities();
