// ormconfig.ts (en la RAÍZ del proyecto)

import { DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    logging: false,
    
    // Ruta absoluta a las entidades desde la raíz del proyecto
    entities: [
        'src/entities/*.ts' 
    ],
    migrations: ['src/migrations/*.ts'],
    // ... otros ajustes
};

export default config;