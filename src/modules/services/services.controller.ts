import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";
import { servicesService } from "./services.service";
import jwt from "jsonwebtoken";
import { IServiceQuery } from "./services.interface";








// Create service (Technican)

const createService = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    if (!req.user) {
        throw new Error("Unauthorized");
    }


    const userid = req.user?.id; // Requested User/Technician
    const payload = req.body;

    console.log("create service: ", userid, payload)


    const service = await servicesService.createServiceInDB(payload, userid);


    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: "Service created successfully.",
        data: service,
    });


})




// Get all services (public)
const getAllServices = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const filters: IServiceQuery = {
        ...req.query,
    } as IServiceQuery;




    const { services, meta } = await servicesService.getAllServicesFromDB(filters);

    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "Services retrieved successfully",
        data: services,
        meta: meta,
    });

})







const getSingleServiceById = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

    const serviceId = req.params.id;

    
    const getServiceDetails = await servicesService.getSingleServiceByIdFromDB(serviceId as string);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Service Details patched successfully",
      data: getServiceDetails,
    });
})


const getAllServiceByTechnicianId = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

    const technicianId = req.params.id;

    
    const getAllServices = await servicesService.getAllServicesByTechnicianIdFromDB(technicianId as string);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Service Details retrieved successfully",
      data: getAllServices,
    });
})




const EditServiceByTechnicianId = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

    const technicianId = req.params.id; 
    // const serviceId = req.params.serviceId;

    const payload = req.body;

    const UpdatedServices = await servicesService.EditServiceByTechnicianIdFromDB(technicianId as string, payload);
    
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Service Details edited successfully",
      data: UpdatedServices,
    });

})













export const servicesController = {
    createService,
    getAllServices,
    getSingleServiceById,
   getAllServiceByTechnicianId,
   EditServiceByTechnicianId,


}