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

  // const response = payload;

  await prisma.$transaction(async (tx) => {
    const updatedPaymentData = await tx.payment.update({
      where: {
        transactionId: response.tran_id,
      },
      data: {
        status: PaymentStatus.PAID,
        paymentGatewayData: response,
      },
    });

    await tx.appointment.update({
      where: {
        id: updatedPaymentData.appointmentId,
      },
      data: {
        paymentStatus: PaymentStatus.PAID,
      },
    });
  });

  return {
    message: "Payment Success!",
  };
};

export { initPaymentService, validatePaymentService };
