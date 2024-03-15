import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createAdminIntoDB = async (data: any) => {
  const hashPassword = await bcrypt.hash(data.password, 12);

  const userData = {
    email: data.admin.email,
    password: hashPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createUser = await transactionClient.user.create({
      data: userData,
    });

    const createAdmin = await transactionClient.admin.create({
      data: data.admin,
    });

    return { createUser, createAdmin };
  });

  return result;
};

export { createAdminIntoDB };
