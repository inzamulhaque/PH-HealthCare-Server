import { Request } from "express";
import { uploadToCloudinary } from "../../../helpars/fileUploader";
import prisma from "../../../shared/prisma";
import { IFile } from "../../interfaces/file";
import { Specialties } from "@prisma/client";

const createSpecialtyIntoDB = async (req: Request) => {
  const file = req.file as IFile;

  if (file) {
    const uploadImage = await uploadToCloudinary(file);
    req.body.icon = uploadImage?.secure_url;
  }

  const result = await prisma.specialties.create({
    data: req.body,
  });

  return result;
};

const getAllSpecialtyFromDB = async (): Promise<Specialties[]> => {
  return await prisma.specialties.findMany();
};

const deleteSpecialtyFromDB = async (id: string): Promise<Specialties> => {
  const result = await prisma.specialties.delete({
    where: {
      id,
    },
  });
  return result;
};

export { createSpecialtyIntoDB, getAllSpecialtyFromDB, deleteSpecialtyFromDB };
