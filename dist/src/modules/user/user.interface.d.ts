import { Role } from "../../../generated/prisma/client";
export interface RegisterUserPayload {
    name: string;
    email: string;
    password: string;
    phone?: string;
    profilePhoto?: string;
    role?: Role;
}
//# sourceMappingURL=user.interface.d.ts.map