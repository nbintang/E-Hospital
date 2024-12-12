'use client'

import { useState, useEffect } from 'react'

import AppointmentForm from './appointment-form'
import AppointmentList from './appointment-table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { appointments, doctors, hospitals, users } from './data'
import { Prisma } from '@prisma/client'

export type AppointmentProps = Prisma.AppointmentGetPayload<{
  include: {
    doctor: {
      include: {
        specialization: true;
        user: {
          include: {
            profile: true;
          };
        };
      };
    };
    hospital: {
      include: {
        address: true;
      };
    };
    user: {
      include: {
        profile: true;
      };
    };
  };
}>;

export default function AppointmentPage() {
  const [userAppointments, setUserAppointments] = useState<AppointmentProps[]>([])
  const [currentUser, setCurrentUser] = useState(users[2]) // Using the patient user for this example

  useEffect(() => {
    // Filter appointments for the current user
    setUserAppointments(appointments.filter(app => app.userId === currentUser.id))
  }, [currentUser])

  const handleAppointmentSubmit = (newAppointment: Omit<AppointmentProps, 'id' | 'createdAt' | 'updatedAt'>) => {
    const createdAppointment: AppointmentProps = {
      ...newAppointment,
      id: (appointments.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      doctor: doctors.find(d => d.id === newAppointment.doctorId)!,
      hospital: hospitals.find(h => h.id === newAppointment.hospitalId)!,
      user: currentUser,
    }
    appointments.push(createdAppointment)
    setUserAppointments([...userAppointments, createdAppointment])
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Appointment Booking</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Book an Appointment</CardTitle>
            <CardDescription>Choose a doctor and schedule your appointment</CardDescription>
          </CardHeader>
          <CardContent>
            <AppointmentForm 
              doctors={doctors} 
              hospitals={hospitals} 
              onSubmit={handleAppointmentSubmit} 
              userId={currentUser.id}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Appointments</CardTitle>
            <CardDescription>View and manage your appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <AppointmentList appointments={userAppointments} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

