import { ROLE } from "src/modules/user/enum/role.enum";

export interface IJwtPayload  {
    id: number;
    email: string;
    role: ROLE;
}