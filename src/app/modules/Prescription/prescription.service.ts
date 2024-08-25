import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { AppointmentStatus, PaymentStatus } from "@prisma/client";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpars/paginationHelper";

const getMyPrescriptionService = async (
  user: JwtPayload,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);

  const result = await prisma.prescription.findMany({
    where: {
      patient: {
        email: user.email,
      },
    },
    skip: skip,
    take: limit,

    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.prescription.count({
    where: {
      patient: {
        email: user.email,
      },
    },
  });

  return {
    meta: {
      total,
      page,
      limit,
    },

    data: result,
  };
};

const createNewPrescriptionService = async (
  user: JwtPayload,
  payload: { appointmentId: string; instruction: string; followUpDate: any }
) => {
  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id: payload.appointmentId,
      status: AppointmentStatus.COMPLETED,
      paymentStatus: PaymentStatus.PAID,
    },
    include: {
      doctor: true,
    },
  });

  if (user?.email !== appointmentData.doctor.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This is not your appointment!");
  }

  const result = await prisma.prescription.create({
    data: {
      ...payload,
      doctorId: appointmentData.doctorId,
      patientId: appointmentData.patientId,
    },

    include: {
      doctor: true,
      patient: true,
    },
  });

  return result;
};

export { getMyPrescriptionService, createNewPrescriptionService };
