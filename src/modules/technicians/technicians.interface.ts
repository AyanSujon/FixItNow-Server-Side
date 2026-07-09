import { Profession, SkillsType } from "../../../generated/prisma/enums";

export interface TechnicianFilters {
  city?: string;
  profession?: Profession;
  isAvailable?: boolean;
  isApproved?: boolean;
  minExperience?: number;
  minRating?: number;
  maxHourlyRate?: number;

  page?: number;
  limit?: number;
}



export interface IBookingSlot {
  serviceId?: string;
  date?: Date;
  startsAt?: Date;
  endsAt?: Date;
  isAvailable?: boolean;
  isBooked?: boolean;
  note?: string;
  bookingDeadline?: Date;
  maxBookings?: number;
}







export interface IUpdateTechnicianProfile {
  bio?: string;
  profilePhoto?: string;
  description?: string;
  profession?: Profession;
  skills?: SkillsType;
  yearsOfExperience?: number;
  hourlyRate?: number;
  isAvailable?: boolean;
  responseTime?: number;
  isApproved?: boolean;
  address?: string;
  city?: string;
  district?: string;
}

