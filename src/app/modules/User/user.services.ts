import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { Request } from "express";
import { uploadToCloudinary } from "../../../helpars/fileUploader";
import { IFile } from "../../interfaces/file";

const createAdminIntoDB = async (req: Request) => {
  const file = req.file as IFile;

  if (file) {
    const uploadToProfileImg = await uploadToCloudinary(file);
    req.body.admin.profilePhoto = uploadToProfileImg?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.admin.create({
      data: req.body.admin,
    });

    return createdAdminData;
  });

  return result;
};

const createDoctorIntoDB = async (req: Request) => {
  const file = req.file as IFile;

  if (file) {
    const uploadToProfileImg = await uploadToCloudinary(file);
    req.body.doctor.profilePhoto = uploadToProfileImg?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdDoctorData = await transactionClient.doctor.create({
      data: req.body.doctor,
    });

    return createdDoctorData;
  });

  return result;
};

export { createAdminIntoDB, createDoctorIntoDB };
