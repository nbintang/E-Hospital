import { AppointmentProps } from "@/types/appointment";
import { Address, Appointment, Prisma } from "@prisma/client"
export const specializations: Prisma.SpecializationGetPayload<{include: {doctors: true}}>[] = [
  { id: '1', name: 'Cardiology', createdAt: new Date(), updatedAt: new Date(), doctors: [] },
  { id: '2', name: 'Neurology', createdAt: new Date(), updatedAt: new Date(), doctors: [] },
  { id: '3', name: 'Pediatrics', createdAt: new Date(), updatedAt: new Date(), doctors: [] },
]

export const addresses: Prisma.AddressGetPayload<{include: {hospitals: true; profiles: true}}>[] = [
  { id: '1', slug: 'central-hospital', name: '123 Main St, Cityville', createdAt: new Date(), updatedAt: new Date(), latitude: 40.7128, longitude: -74.0060, hospitals: [], profiles: [] },
  { id: '2', slug: 'north-clinic', name: '456 Oak Ave, Townsburg', createdAt: new Date(), updatedAt: new Date(), latitude: 34.0522, longitude: -118.2437, hospitals: [], profiles: [] },
]

export const hospitals: Prisma.HospitalGetPayload<{include: {address: true; appointment: true; doctors: true}}>[] = [
  { id: '1', slug: 'central-hospital', name: 'Central Hospital', addressId: '1', createdAt: new Date(), updatedAt: new Date(), appointment  : [], doctors: [], address: addresses[0] },
  { id: '2', slug: 'north-clinic', name: 'North Clinic', addressId: '2', createdAt: new Date(), updatedAt: new Date(), appointment  : [], doctors: [], address: addresses[1] },
]

export const users: Prisma.UsersGetPayload<{include: {profile: true; doctor: true; appointments: true}}>[] = [
  { id: '1', email: 'dr.smith@example.com', password: 'hashed_password', role: 'DOCTOR', createdAt: new Date(), updatedAt: new Date(), termAccepted: true, appointments: [], doctor: null, profile: null },
  { id: '2', email: 'dr.johnson@example.com', password: 'hashed_password', role: 'DOCTOR', createdAt: new Date(), updatedAt: new Date(), termAccepted: true, appointments: [], doctor: null, profile: null },
  { id: '3', email: 'patient@example.com', password: 'hashed_password', role: 'PATIENT', createdAt: new Date(), updatedAt: new Date(), termAccepted: true, appointments: [], doctor: null, profile: null },
]

export const profiles = [
  { id: '1', fullname: 'Dr. John Smith', addressId: '1', gender: 'MALE', userId: '1', createdAt: new Date(), updatedAt: new Date(), user: users[0] },
  { id: '2', fullname: 'Dr. Emily Johnson', addressId: '2', gender: 'FEMALE', userId: '2', createdAt: new Date(), updatedAt: new Date(), user: users[1] },
  { id: '3', fullname: 'Alice Patient', addressId: '1', gender: 'FEMALE', userId: '3', createdAt: new Date(), updatedAt: new Date(), user: users[2] },
]

export const doctors: Prisma.DoctorGetPayload<{include: {specialization: true; user: true; appointments: true; hospital: true}}>[] = [
  { id: '1', userId: '1', hospitalId: '1', specializationId: '1', createdAt: new Date(), updatedAt: new Date(), appointments: [], hospital: hospitals[0], specialization: specializations[0], user: users[0] },
  { id: '2', userId: '2', hospitalId: '2', specializationId: '2', createdAt: new Date(), updatedAt: new Date(), appointments: [], hospital: hospitals[1], specialization: specializations[1], user: users[1] },
]

users[0].doctor = doctors[0]
users[1].doctor = doctors[1]

export const appointments:   AppointmentProps[] = [
  { id: '1', userId: '3', doctorId: '1', hospitalId: '1', dateTime: new Date('2023-06-15T10:00:00'), status: 'CONFIRMED', createdAt: new Date(), updatedAt: new Date(), doctor: doctors[0], hospital: hospitals[0], user: users[2] },
  { id: '2', userId: '3', doctorId: '2', hospitalId: '2', dateTime: new Date('2023-06-20T14:30:00'), status: 'PENDING', createdAt: new Date(), updatedAt: new Date(), doctor: doctors[1], hospital: hospitals[1], user: users[2] },
]

doctors[0].appointments.push(appointments[0])
doctors[1].appointments.push(appointments[1])
users[2].appointments.push(appointments[0], appointments[1])
hospitals[0].appointment  .push(appointments[0])
hospitals[1].appointment  .push(appointments[1])

