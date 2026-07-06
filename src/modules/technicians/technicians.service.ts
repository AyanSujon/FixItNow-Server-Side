import { Role } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";



const getAlltechniciansFromDB = async () => {
  const technicians = await prisma.user.findMany({
    where: {
      role: "TECHNICIAN",
    },
    omit: {
      password: true,
    },
    include: {
      technicianProfile: true,
    },
  });

  return technicians;
};





export const techniciansService ={
    getAlltechniciansFromDB,

}