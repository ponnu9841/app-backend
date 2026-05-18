import prisma from "@/config/database";
import { hashPassword, comparePassword } from "@/utils/password";
import { sendMail } from "../../utils/email";
import { ErrorStatus } from "@/types/common";

type MobileUpdateOtpEntry = {
    phoneNumber: string;
    otp: string;
    expiresAt: Date;
};

const mobileUpdateOtpStore = new Map<string, MobileUpdateOtpEntry>();
const OTP_EXPIRY_MS = 10 * 60 * 1000;

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const changePassword = async (data: {
    userId: string;
    currentPassword: string;
    newPassword: string;
}) => {
    const user = await prisma.user.findUnique({ where: { id: data.userId } });
    if (!user) {
        const error: ErrorStatus = new Error("User not found");
        error.status = 404;
        throw error;
    }

    const isMatch = await comparePassword(data.currentPassword, user.password);
    if (!isMatch) {
        const error: ErrorStatus = new Error("Current password is incorrect");
        error.status = 409;
        throw error;
    }

    const hashedPassword = await hashPassword(data.newPassword);
    await prisma.user.update({
        where: { id: data.userId },
        data: { password: hashedPassword },
    });
};

export const sendMobileUpdateEmailOtp = async (data: {
    userId: string;
    phoneNumber: string;
}) => {
    const user = await prisma.user.findUnique({
        where: { id: data.userId },
    });

    if (!user) {
        const error: Error & { status?: number } = new Error("User not found");
        error.status = 404;
        throw error;
    }

    if (!user.email) {
        const error: Error & { status?: number } = new Error("Registered email is required to send OTP");
        error.status = 400;
        throw error;
    }

    const existingMobileUser = await prisma.user.findFirst({
        where: {
            phone: data.phoneNumber,
            NOT: { id: data.userId },
        },
    });

    console.log(existingMobileUser);


    if (existingMobileUser) {
        const error: Error & { status?: number } = new Error("This mobile number is already in use");
        error.status = 409;
        throw error;
    }

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS);
    mobileUpdateOtpStore.set(data.userId, {
        phoneNumber: data.phoneNumber,
        otp,
        expiresAt,
    });

    await sendMail({
        to: user.email,
        subject: "Verify your mobile number update",
        text: `Your OTP to update your mobile number to ${data.phoneNumber} is ${otp}. This code expires in 10 minutes.`,
    });
};

export const verifyAndUpdateMobile = async (data: {
    userId: string;
    phoneNumber: string;
    otp: string;
}) => {
    const entry = mobileUpdateOtpStore.get(data.userId);
    console.log(entry)
    if (!entry || entry.phoneNumber !== data.phoneNumber) {
        const error: Error & { status?: number } = new Error("Invalid OTP or mobile number");
        error.status = 400;
        throw error;
    }

    if (entry.expiresAt < new Date()) {
        mobileUpdateOtpStore.delete(data.userId);
        const error: Error & { status?: number } = new Error("OTP has expired");
        error.status = 400;
        throw error;
    }

    if (entry.otp !== data.otp) {
        const error: Error & { status?: number } = new Error("Invalid OTP");
        error.status = 400;
        throw error;
    }

    await prisma.user.update({
        where: { id: data.userId },
        data: { phone: data.phoneNumber },
    });

    mobileUpdateOtpStore.delete(data.userId);

};
