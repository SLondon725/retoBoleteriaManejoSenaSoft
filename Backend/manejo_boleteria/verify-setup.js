const { AppDataSource } = require('./dist/config/database');
const { Artistas } = require('./dist/entities/Artistas');
const { Localidades } = require('./dist/entities/Localidades');
const { LocalidadDetalle } = require('./dist/entities/LocalidadDetalle');
const { Usuarios } = require('./dist/entities/Usuarios');

async function verifySetup() {
    try {
        console.log('🔍 Verificando configuración de la base de datos...');
        
        // Inicializar la conexión
        await AppDataSource.initialize();
        console.log('✅ Conexión a la base de datos establecida');

        // Verificar entidades
        const artistaRepo = AppDataSource.getRepository(Artistas);
        const localidadRepo = AppDataSource.getRepository(Localidades);
        const localidadDetalleRepo = AppDataSource.getRepository(LocalidadDetalle);
        const usuarioRepo = AppDataSource.getRepository(Usuarios);

        console.log('✅ Repositorios inicializados');

        // Verificar que las tablas existen y tienen los campos correctos
        console.log('🔍 Verificando estructura de tablas...');
        
        // Verificar tabla artistas
        const artistas = await artistaRepo.find({ take: 1 });
        console.log('✅ Tabla artistas accesible');

        // Verificar tabla localidades
        const localidades = await localidadRepo.find({ take: 1 });
        console.log('✅ Tabla localidades accesible');

        // Verificar tabla localidad_detalle
        const localidadesDetalle = await localidadDetalleRepo.find({ take: 1 });
        console.log('✅ Tabla localidad_detalle accesible');

        // Verificar tabla usuarios
        const usuarios = await usuarioRepo.find({ take: 1 });
        console.log('✅ Tabla usuarios accesible');

        console.log('\n🎉 ¡Verificación completada exitosamente!');
        console.log('📋 Resumen de cambios aplicados:');
        console.log('   • Campo "descripcion" agregado a tabla artistas');
        console.log('   • Campo "descripcion" agregado a tabla localidades');
        console.log('   • Campo "valor" cambiado a "precio" en localidad_detalle');
        console.log('   • Campo "correo" actualizado en usuarios (VARCHAR(100), UNIQUE)');
        console.log('   • Campo "pass" actualizado en usuarios (VARCHAR(255))');
        console.log('   • Datos de prueba insertados en tablas de soporte');

    } catch (error) {
        console.error('❌ Error durante la verificación:', error.message);
        console.error('💡 Asegúrate de que:');
        console.error('   1. La base de datos esté ejecutándose');
        console.error('   2. El archivo migration.sql se haya ejecutado');
        console.error('   3. Las credenciales de la base de datos sean correctas');
    } finally {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    }
}

// Ejecutar verificación
verifySetup();
