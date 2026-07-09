

import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";
import { techniciansService } from "./technicians.service";






const getAlltechnicians = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = {
      ...req.query,

      isAvailable:
        req.query.isAvailable !== undefined
          ? req.query.isAvailable === "true"
          : undefined,

      isApproved:
        req.query.isApproved !== undefined
          ? req.query.isApproved === "true"
          : undefined,

      minExperience:
        req.query.minExperience !== undefined
          ? Number(req.query.minExperience)
          : undefined,

      minRating:
        req.query.minRating !== undefined
          ? Number(req.query.minRating)
          : undefined,

      maxHourlyRate:
        req.query.maxHourlyRate !== undefined
          ? Number(req.query.maxHourlyRate)
          : undefined,
    };

    // console.log("filters", filters);

    const { technicians, meta } = await techniciansService.getAlltechniciansFromDB(filters);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "technicians profile fetched successfully.",
      data: technicians,
      meta: {
        ...meta
      }
    });
  }
);




const getTechnicianById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;



    const technician = await techniciansService.getTechnicianByIdFromDB(id as string);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "technician profile fetched successfully.",
      data: { technician },
    });
  })








const createAvailabilitySlots = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await techniciansService.createAvailabilitySlotsInDB(
      payload
    );

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.CREATED,
      message: "Availability slot created successfully.",
      data: result,
    });
  }
);









const updateAvailabilitySlots = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;


    const updatedSlot = await techniciansService.updateAvailabilitySlotsinDB(
      id as string,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Booking slot availability updated successfully.",
      data: updatedSlot,
    });
  }
);







const updateTechnicianProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const technicianId = req.user?.id;


    const updatedProfile = await techniciansService.updateTechnicianProfileinDB(
      technicianId as string,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Profile updated successfully.",
      data: updatedProfile,
    });
  }
);








const getTechnicianOwnBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const technicianId = req.user?.id;

  const TechnicianOwnBookings = await techniciansService.getTechnicianOwnBookingsFromDB(
    technicianId as string
  );

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: "Your all booking patched successfully.",
    data: TechnicianOwnBookings,
  });
})











export const techniciansController = {
  getAlltechnicians,
  getTechnicianById,
  updateAvailabilitySlots,
  createAvailabilitySlots,
  updateTechnicianProfile,
  getTechnicianOwnBookings


};