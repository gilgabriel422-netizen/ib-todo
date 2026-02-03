const { Client } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function fixAdminPassword() {
  let client;
  
  try {
    // Conectar a la base de datos
    client = new Client({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    await client.connect();
    console.log('✅ Conectado a PostgreSQL');

    // Generar hash correcto para 'adm123'
    const password = 'adm123';
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('🔐 Hash generado:', hashedPassword);

    // Actualizar la contraseña del usuario admin
    const result = await client.query(
      `UPDATE usuarios 
       SET password = $1 
       WHERE email = 'admin@crm.com'`,
      [hashedPassword]
    );

    if (result.rowCount > 0) {
      console.log('✅ Contraseña del usuario admin actualizada correctamente');
      console.log('');
      console.log('📝 Credenciales:');
      console.log('   Email: admin@crm.com');
      console.log('   Password: admin2026');
    } else {
      console.log('⚠️  No se encontró el usuario admin@crm.com');
      console.log('   Creando usuario admin...');
      
      // Crear usuario admin si no existe
      await client.query(
        `INSERT INTO usuarios (nombre, email, password, rol) 
         VALUES ('Administrador', 'admin@crm.com', $1, 'admin')`,
        [hashedPassword]
      );
      console.log('✅ Usuario admin creado');
    }

    // Verificar que funciona
    const user = await client.query(
      'SELECT email, rol FROM usuarios WHERE email = $1',
      ['admin@crm.com']
    );
    
    if (user.rows.length > 0) {
      console.log('');
      console.log('✅ Usuario verificado:', user.rows[0]);
    }

    await client.end();
    console.log('');
    console.log('🎉 ¡Proceso completado! Ahora puedes hacer login con:');
    console.log('   Email: admin@crm.com');
    console.log('   Password: admin123');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (client) await client.end();
    process.exit(1);
  }
}

fixAdminPassword();
