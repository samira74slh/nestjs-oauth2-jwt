import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { USER_REPOSITORY } from './constants/user-rep.constants';
import { DATA_SOURCE } from '../mysql/constants/data-source.constants';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  },
];
