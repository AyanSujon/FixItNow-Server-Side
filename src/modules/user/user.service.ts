
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import { RegisterUserPayload } from "./user.interface";



const registerUserIntoDB = async(payload: RegisterUserPayload)=>{
    const {name, email, password, phone, profilePhoto, role} = payload;

    const isUserExist = await prisma.user.findUnique({
        where: {email}
    })
    if(isUserExist){
        throw new Error("User with this email already exists.")
    }

    const hashedPassword = await bcrypt.hash(password, Number(config.bcryptSaltRounds));

    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            phone,
            password: hashedPassword,
            role,
        }
    })

    if(role === "TECHNICIAN"){
        await prisma.technicianProfile.create({
            data: {
                userId: createdUser.id,
                profilePhoto,
            }
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            id: createdUser.id,
            email: createdUser.email || email,
        },
        omit:{
            password: true
        },
        include: {
            technicianProfile: true,
        }
    })
    return user; 
}


const getMyProfileFromDB = async(userId: string)=>{
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        },
        omit: {
            password: true
        },
        include: {
            technicianProfile: true
        }
    });
    return user;
}

const updateMyProfileInDB = async(userId: string, payload: any)=>{
    const {name, email, bio, profilePhoto, description, profession, serviceArea, yearsOfExperience, hourlyRate, isAvailable,  address, city, district}= payload; 
    const updatedUser = await prisma.user.update({
        where: {id:  userId},
        data: {
            name, 
            email,
            technicianProfile: {
                update: {
                    bio,
                    profilePhoto,
                    description,
                    profession, 
                    serviceArea,
                    yearsOfExperience,
                    hourlyRate,
                    isAvailable,
                    address,
                    city,
                    district,
                }
            }
        },
        omit:{
            password: true
        },
        include: {
            technicianProfile: true
        }
    })
    return updatedUser;

}

export const userService = {
    registerUserIntoDB,
    getMyProfileFromDB,
    updateMyProfileInDB
}