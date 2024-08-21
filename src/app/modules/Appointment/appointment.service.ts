import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { v4 as uuidv4 } from "uuid";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpars/paginationHelper";
import {
  AppointmentStatus,
  PaymentStatus,
  Prisma,
  UserRole,
} from "@prisma/client";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";

const createAppointmentIntoDB = async (
  user: JwtPayload,
  payload: {
    doctorId: string;
    scheduleId: string;
  }
) => {
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      id: payload.doctorId,
    },
  });

  await prisma.doctorSchedules.findFirstOrThrow({
    where: {
      doctorId: doctorData.id,
      scheduleId: payload.scheduleId,
      isBooked: false,
    },
  });

  const videoCallingId: string = uuidv4();

  const result = await prisma.$transaction(async (tx) => {
    const appointmentData = await tx.appointment.create({
      data: {
        patientId: patientData.id,
        doctorId: doctorData.id,
        scheduleId: payload.scheduleId,
        videoCallingId: videoCallingId,
      },
      include: {
        patient: true,
        doctor: true,
        schedule: true,
      },
    });

    await tx.doctorSchedules.update({
      where: {
        doctorId_scheduleId: {
          doctorId: doctorData.id,
          scheduleId: payload.scheduleId,
        },
      },
      data: {
        isBooked: true,
        appointmentId: appointmentData.id,
      },
    });

    const today = new Date();
    const transactionId = `PH-HealthCare-${today.getFullYear()}-${today.getMonth()}-${today.getDate()}-${today.getHours()}-${today.getMinutes()}-${Math.floor(
      10000 + Math.random() * 90000
    )}`;

    await tx.payment.create({
      data: {
        appointmentId: appointmentData.id,
        amount: doctorData.appointmentFee,
        transactionId: transactionId,
      },
    });

    return appointmentData;
  });

  return result;
};

const getMyAppointmentService = async (
  user: JwtPayload,
  filters: any,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);

  // const patientData = await prisma.patient.findUniqueOrThrow({
  //   where: {
  //     email: user.email,
  //   },
  // });

  const andCondition: Prisma.AppointmentWhereInput[] = [];

  if (user.role === UserRole.PATIENT) {
    andCondition.push({
      patient: {
        email: user.email,
      },
    });
  } else if ((user.role = UserRole.DOCTOR)) {
    andCondition.push({
      doctor: {
        email: user.email,
      },
    });
  }

  // if (patientData) {
  //   andCondition.push({
  //     patientId: patientData.id,
  //   });
  // }

  if (Object.keys(filters).length > 0) {
    const filterCondition = Object.keys(filters).map((key) => ({
      [key]: {
        equals: filters[key],
      },
    }));

    andCondition.push(...filterCondition);
  }

  const whereCondition: Prisma.AppointmentWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.appointment.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "asc" },
    include:
      user.role === UserRole.PATIENT
        ? {
            doctor: true,
            schedule: true,
          }
        : {
            patient: {
              include: {
                medicalReport: true,
                patientHealthData: true,
              },
            },
            schedule: true,
          },
  });

  const total = await prisma.appointment.count({
    where: whereCondition,
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

const changeAppointmentStatusService = async (
  appointmentId: string,
  status: AppointmentStatus,
  user: JwtPayload
) => {
  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id: appointmentId,
    },
    include: {
      doctor: true,
    },
  });

  if (user.role === UserRole.DOCTOR) {
    if (user.email !== appointmentData.doctor.email) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "This is not your appointment!"
      );
    }
  }

  const result = await prisma.appointment.update({
    where: {
      id: appointmentData.id,
    },
    data: {
      status: status,
    },
  });

  return result;
};

const cancelUnpaidAppointmentsService = async () => {
  const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000);

  const unpaidAppointment = await prisma.appointment.findMany({
    where: {
      createdAt: {
        lte: thirtyMinAgo,
      },
      paymentStatus: PaymentStatus.UNPAID,
    },
  });

  const appointmentIdsToCancel = unpaidAppointment.map(
    (appointment) => appointment.id
  );

  await prisma.$transaction(async (tx) => {
    await tx.payment.deleteMany({
      where: {
        appointmentId: {
          in: appointmentIdsToCancel,
        },
      },
    });

    await tx.appointment.deleteMany({
      where: {
        id: {
          in: appointmentIdsToCancel,
        },
      },
    });

    await tx.doctorSchedules.updateMany({
      where: {
        appointmentId: {
          in: appointmentIdsToCancel,
        },
      },
      data: {
        isBooked: false,
      },
    });
  });
};

export {
  createAppointmentIntoDB,
  getMyAppointmentService,
  changeAppointmentStatusService,
  cancelUnpaidAppointmentsService,
};
