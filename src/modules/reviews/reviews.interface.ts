
export interface ICreateReview {
  technicianId: string;
  bookingId: string;
  serviceId?: string;
  rating: number;
  comment?: string;
}


