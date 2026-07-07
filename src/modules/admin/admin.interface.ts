import { ActiveStatus, Role, userStatus } from "../../../generated/prisma/enums";

export type UserFilters = {
  name?: string;
  email?: string;
  role?: Role;
  activeStatus?: ActiveStatus;
  isVerified?: boolean;
  userStatus?: userStatus;


  page?: number;
  limit?: number;
};


export interface createServiceCategoryPlayload{

  name: string;
  icon?: string;
  description?: string;
}