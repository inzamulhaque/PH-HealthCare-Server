import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { Request } from "express";
import { uploadToCloudinary } from "../../../helpars/fileUploader";
import { IFile } from "../../interfaces/file";

const createAdminIntoDB = async (req: Request) => {
  const file = req.file as IFile;
  console.log(req.body.password);

  if (file) {
    const uploadprofileImg = await uploadToCloudinary(file);
    req.body.admin.profilePhoto = uploadprofileImg?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.data.password, 12);

  const userData = {
    email: req.body.data.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.admin.create({
      data: req.body.data.admin,
    });

    return createdAdminData;
  });

  return result;
};

export { createAdminIntoDB };
