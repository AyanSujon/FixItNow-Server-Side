import { Profession } from "../../../generated/prisma/enums";

export interface TechnicianFilters {
  city?: string;
  profession?: Profession;
  available?: boolean;
  approved?: boolean;
  minExperience?: number;
  minRating?: number;
  maxHourlyRate?: number;
}

