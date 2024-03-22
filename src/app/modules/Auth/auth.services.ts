import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { generateToken, verifyToken } from "../../../helpars/jwtHelpers";
import { UserStatus } from "@prisma/client";

const loginService = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }

  const accessToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "123456",
    "5m"
  );

  const refreshToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "123456789",
    "30d"
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshTokenService = async (token: string) => {
  let decodedData;
  try {
    decodedData = verifyToken(token, "123456789");
  } catch (error) {
    throw new Error("You are not authorized!");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "123456",
    "5m"
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

export { loginService, refreshTokenService };
