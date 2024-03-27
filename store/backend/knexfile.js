// knexfile.js
module.exports = {
    client: 'mssql',
    connection: {
      server: 'cloudappdjango.database.windows.net',
      user: 'cloudapp',
      password: '5Sv^44P]d4',
      database: 'aji',
      options: {
        encrypt: true,
        trustServerCertificate: false,
        hostNameInCertificate: '*.database.windows.net',
        loginTimeout: 30,
      },
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  };
  