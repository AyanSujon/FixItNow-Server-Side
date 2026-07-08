

export interface IBookingSlot {
  startTime: Date;
  endTime: Date;
}

export interface IBooking {
  technicianId: string;
  serviceId: string;
  note?: string;
  bookingSlots: IBookingSlot[];
}