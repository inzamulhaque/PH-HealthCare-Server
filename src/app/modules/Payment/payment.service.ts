import prisma from "../../../shared/prisma";
import { initPayment, sslValidatePaymentService } from "../SSL/ssl.service";
import { PaymentStatus } from "@prisma/client";

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

const validatePaymentService = async (payload: any) => {
  if (!payload || !payload.status || payload.status !== "VALID") {
    return {
      message: "Invalid Payment",
    };
  }

  const response = await sslValidatePaymentService(payload);

  if (response.status !== "VALID") {
    return {
      message: "Payment Failed",
    };
  }

  await prisma.$transaction(async (tx) => {
    await tx.payment.updateMany({
      where: {
        transactionId: response.tran_id,
      },
      data: {
        status: PaymentStatus.PAID,
        paymentGatewayData: response,
      },
    });
  });
};

export { initPaymentService, validatePaymentService };
