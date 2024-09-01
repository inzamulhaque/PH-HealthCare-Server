import { PaymentStatus, UserRole } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import prisma from "../../../shared/prisma";

const fetchDashboardMetaDataService = async (user: JwtPayload) => {
  switch (user.role) {
    case UserRole.SUPER_ADMIN:
      getSuperAdminMetaDataService();
      break;

    case UserRole.ADMIN:
      getAdminMetaDataService();
      break;

    case UserRole.DOCTOR:
      getDoctorMetaDataService(user);
      break;

    case UserRole.PATIENT:
      getPatientMetaDataService();
      break;

    default:
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid User!");
      break;
  }
};

const getSuperAdminMetaDataService = async () => {};

const getAdminMetaDataService = async () => {
  const appointmentCount = await prisma.appointment.count();
  const patientCount = await prisma.patient.count();
  const doctorCount = await prisma.doctor.count();
  const paymentCount = await prisma.payment.count();

  const totalRevenue = await prisma.payment.aggregate({
    where: {
      status: PaymentStatus.PAID,
    },

    _sum: {
      amount: true,
    },
  });

  console.log({
    appointmentCount,
    patientCount,
    doctorCount,
    paymentCount,
    totalRevenue,
  });
};

const getDoctorMetaDataService = async (user: JwtPayload) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const appointmentCount = await prisma.appointment.count({
    where: {
      doctorId: doctorData.id,
    },
  });

  const patientCount = await prisma.appointment.groupBy({
    by: ["patientId"],
    where: {
      doctorId: doctorData.id,
    },
  });

  const reviewCount = await prisma.review.count({
    where: {
      doctorId: doctorData.id,
    },
  });

  const totalRevenue = await prisma.payment.aggregate({
    where: {
      status: PaymentStatus.PAID,
      appointment: {
        doctorId: doctorData.id,
      },
    },

    _sum: {
      amount: true,
    },
  });

  const appointmentStatusDistribution = await prisma.appointment.groupBy({
    where: {
      doctorId: doctorData.id,
    },

    by: ["status"],

    _count: {
      id: true,
    },
  });

  const formattedAppointmentStatusDistribution =
    appointmentStatusDistribution.map((count) => ({
      status: count.status,
      count: count._count.id,
    }));

  console.log({
    appointmentCount,
    patientCount,
    reviewCount,
    totalRevenue,
    formattedAppointmentStatusDistribution,
  });
};

const getPatientMetaDataService = async () => {};

export { fetchDashboardMetaDataService };
