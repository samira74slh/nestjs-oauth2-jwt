import { DataSource } from 'typeorm';
import { DATA_SOURCE } from './constants/data-source.constants';

export const mysqlProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        url: process.env.MYSQL_URL,
        charset: 'utf8mb4_general_ci',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        logging: false,
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
