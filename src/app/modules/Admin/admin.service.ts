import { Prisma } from "@prisma/client";
import { adminSearchAbleFields } from "./admin.constant";
import { paginationHelper } from "../../../helpars/paginationHelper";
import prisma from "../../../shared/prisma";

const getAllAdminFromDB = async (
  params: Record<string, unknown>,
  options: Record<string, unknown>
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.AdminWhereInput[] = [];

  // [
  //         {
  //           name: {
  //             contains: params.searchTerm as string,
  //             mode: "insensitive",
  //           },
  //         },

  //         {
  //           email: {
  //             contains: params.searchTerm as string,
  //             mode: "insensitive",
  //           },
  //         },
  //       ],

  if (searchTerm) {
    andConditions.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm as string,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.orderBy
        ? {
            [options.sortBy as string]: options.sortOrder,
          }
        : {
            createdAt: "asc",
          },
  });

  return result;
};

export { getAllAdminFromDB };
