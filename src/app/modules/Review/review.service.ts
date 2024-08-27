import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";

const createNewReviewService = async (
  user: JwtPayload,
  payload: { appointmentId: string; rating: number; comment: string }
) => {
  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id: payload.appointmentId,
      patient: {
        email: user.email,
      },
    },
  });

  return await prisma.$transaction(async (tx) => {
    const result = await tx.review.create({
      data: {
        patientId: appointmentData.patientId,
        doctorId: appointmentData.doctorId,
        ...payload,
      },

      include: {
        patient: true,
        doctor: true,
      },
    });

    const averageRating = await tx.review.aggregate({
      where: {
        doctorId: result.doctorId,
      },
      _avg: {
        rating: true,
      },
    });

    await tx.doctor.update({
      where: {
        id: result.doctorId,
      },
      data: {
        averageRating: averageRating._avg.rating,
      },
    });

    return result;
  });

  //   return result;
};

export { createNewReviewService };
