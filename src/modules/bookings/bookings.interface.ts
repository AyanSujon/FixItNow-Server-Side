

// export interface IBookingSlot {
//   startTime: Date;
//   endTime: Date;
// }

// export interface IBooking {
//   technicianId: string;
//   serviceId: string;
//   note?: string;
//   bookingSlots: IBookingSlot[];
// }



export interface IBooking {
  technicianId: string;
  serviceId: string;
  note?: string;
  bookingSlotIds: string[];
}

// Playload:
// {
//   "technicianId": "0d9c7a67-1d3c-4a44-8b31-a11b4f44d221",
//   "serviceId": "81a50cf5-33fc-42c9-a878-91e3c4ddf5b9",
//   "note": "Please arrive on time.",
//   "bookingSlotIds": [
//     "5d6d7b34-a2b4-4c3e-aef0-1d09ef83a111",
//     "7a4cbec1-5f58-4fd7-9c8e-2f8d66d9b222"
//   ]
// }