import axios from "axios";
import config from "../../../config";
import prisma from "../../../shared/prisma";
import { initPayment } from "../SSL/ssl.service";

const initPaymentService = async (appointmentID: string) => {
  const paymentData = await prisma.payment.findUniqueOrThrow({
    where: {
      appointmentId: appointmentID,
    },
    include: {
      appointment: {
        include: {
          patient: true,
        },
      },
    },
  });

  const initPaymentData = {
    amount: paymentData.amount,
    transactionId: paymentData.transactionId,
    name: paymentData.appointment.patient.name,
    email: paymentData.appointment.patient.email,
    address: paymentData.appointment.patient.address,
    phoneNumber: paymentData.appointment.patient.contactNumber,
  };

  const result = await initPayment(initPaymentData);

  return {
    paymentUrl: result.GatewayPageURL,
  };
};

export { initPaymentService };
