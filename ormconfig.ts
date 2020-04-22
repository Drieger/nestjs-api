module.exports = {
  type: 'sqlite',
  database: 'database.db',
  entities: [__dirname + '/**/**/*.entity{.ts, .js}'],
  migrations: [__dirname + '/migrations/*{.ts, .js}'],
  migrationsRun: true,
  logging: false,
  logger: 'advanced-console',
  synchronize: true,
  cli: {
    migrationsDir: 'migrations',
  },
};
