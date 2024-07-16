import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { v4 as uuidv4 } from "uuid";

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

  const result = await prisma.appointment.create({
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

  return result;
};

export { createAppointmentIntoDB };
