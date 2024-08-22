import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { AppointmentStatus, PaymentStatus } from "@prisma/client";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";

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

export { createNewPrescriptionService };
