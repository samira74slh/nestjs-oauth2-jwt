import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ROLE } from './enum/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;

  @Column({ length: 100, nullable: true })
  name: string;

  @Column({ type: 'enum', enum: ROLE, default: ROLE.User })
  role: ROLE;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: Date;
}
