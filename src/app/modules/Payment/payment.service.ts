import axios from "axios";
import config from "../../../config";
import prisma from "../../../shared/prisma";

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

  const data = {
    store_id: config.sslcz.sslcz_store_id,
    store_passwd: config.sslcz.sslcz_store_passwd,
    total_amount: paymentData.amount,
    currency: "BDT",
    tran_id: paymentData.transactionId, // use unique tran_id for each api call
    success_url: config.sslcz.sslcz_success_url,
    fail_url: config.sslcz.sslcz_fail_url,
    cancel_url: config.sslcz.sslcz_cancel_url,
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "N/A",
    product_name: "Appointment",
    product_category: "Health",
    product_profile: "general",
    cus_name: paymentData.appointment.patient.name,
    cus_email: paymentData.appointment.patient.email,
    cus_add1: paymentData.appointment.patient.address,
    cus_add2: paymentData.appointment.patient.address,
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: paymentData.appointment.patient.contactNumber,
    cus_fax: "01711111111",
    ship_name: paymentData.appointment.patient.name,
    ship_add1: paymentData.appointment.patient.address,
    ship_add2: paymentData.appointment.patient.address,
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  const response = await axios({
    method: "post",
    url: config.sslcz.sslcz_payment_api,
    data: data,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return 0;
};

export { initPaymentService };
