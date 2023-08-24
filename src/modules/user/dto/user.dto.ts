import { ROLE } from '../enum/role.enum';

export class UserDto {
  id: number;
  name: string;
  email: string;
  role: ROLE;
  created_at: Date;
}
