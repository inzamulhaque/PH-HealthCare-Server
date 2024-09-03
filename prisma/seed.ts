import bcrypt from "bcrypt";
import { UserRole } from "@prisma/client";
import prisma from "../src/shared/prisma";
import config from "../src/config";

const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await prisma.user.findFirst({
      where: {
        role: UserRole.SUPER_ADMIN,
      },
    });

    if (isSuperAdminExist) {
      console.log("Super admin already exist!");
    }

    if (!isSuperAdminExist) {
      const hashedPassword: string = await bcrypt.hash(
        config.superAdmin.password as string,
        12
      );

      const superAdmin = await prisma.user.create({
        data: {
          email: config.superAdmin.email as string,
          password: hashedPassword,
          role: UserRole.SUPER_ADMIN,
          admin: {
            create: {
              name: config.superAdmin.name as string,
              contactNumber: config.superAdmin.contactNumber as string,
            },
          },
        },
      });

      console.log(superAdmin);
    }
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }
};

seedSuperAdmin();
