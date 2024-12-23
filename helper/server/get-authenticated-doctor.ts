"use server";
import authOptions from "@/lib/auth-options";
import { findDoctorByUserId } from "@/repositories/articles.repository";
import { getServerSession } from "next-auth";

export async function getAuthenticatedDoctor() {
    const session = await getServerSession(authOptions);
    if (!session) return null;
    const doctor = await findDoctorByUserId(session.user.id);
    if (!doctor) return null;
    return doctor;
}