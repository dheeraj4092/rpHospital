import dataStore, { type AppointmentStatus } from '../data/store.js';

export interface CreateAppointmentData {
  patientName: string;
  phone: string;
  doctorId?: string;
  departmentId?: string;
  notes?: string;
  preferredDate?: Date;
}

export interface UpdateAppointmentData {
  status?: AppointmentStatus;
  doctorId?: string;
  departmentId?: string;
  notes?: string;
  preferredDate?: Date;
}

// Helper to generate unique IDs
let appointmentCounter = 1000;
const generateAppointmentId = () => `apt_${Date.now()}_${appointmentCounter++}`;

export const appointmentService = {
  async createAppointment(data: CreateAppointmentData) {
    const newAppointment = {
      id: generateAppointmentId(),
      patientName: data.patientName,
      phone: data.phone,
      doctorId: data.doctorId,
      departmentId: data.departmentId,
      notes: data.notes,
      preferredDate: data.preferredDate,
      status: 'PENDING' as AppointmentStatus,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dataStore.appointments.push(newAppointment);

    // Include related doctor and department
    const doctor = data.doctorId
      ? dataStore.doctors.find((d) => d.id === data.doctorId)
      : undefined;
    const department = data.departmentId
      ? dataStore.departments.find((d) => d.id === data.departmentId)
      : undefined;

    return {
      ...newAppointment,
      doctor: doctor
        ? {
            id: doctor.id,
            name: doctor.name,
            specialty: doctor.specialty,
          }
        : null,
      department: department
        ? {
            id: department.id,
            name: department.name,
          }
        : null,
    };
  },

  async getAppointmentById(id: string) {
    const appointment = dataStore.appointments.find((a) => a.id === id);
    if (!appointment) return null;

    const doctor = appointment.doctorId
      ? dataStore.doctors.find((d) => d.id === appointment.doctorId)
      : undefined;
    const department = appointment.departmentId
      ? dataStore.departments.find((d) => d.id === appointment.departmentId)
      : undefined;

    return {
      ...appointment,
      doctor: doctor || null,
      department: department || null,
    };
  },

  async getAllAppointments(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const total = dataStore.appointments.length;

    // Sort by createdAt desc and paginate
    const sortedAppointments = [...dataStore.appointments].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    const paginatedAppointments = sortedAppointments.slice(skip, skip + limit);

    // Include related doctor and department
    const appointments = paginatedAppointments.map((appointment) => {
      const doctor = appointment.doctorId
        ? dataStore.doctors.find((d) => d.id === appointment.doctorId)
        : undefined;
      const department = appointment.departmentId
        ? dataStore.departments.find((d) => d.id === appointment.departmentId)
        : undefined;

      return {
        ...appointment,
        doctor: doctor
          ? {
              id: doctor.id,
              name: doctor.name,
              specialty: doctor.specialty,
            }
          : null,
        department: department
          ? {
              id: department.id,
              name: department.name,
            }
          : null,
      };
    });

    return {
      appointments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async updateAppointment(id: string, data: UpdateAppointmentData) {
    const appointmentIndex = dataStore.appointments.findIndex((a) => a.id === id);
    if (appointmentIndex === -1) return null;

    const appointment = dataStore.appointments[appointmentIndex];
    const updatedAppointment = {
      ...appointment,
      ...data,
      updatedAt: new Date(),
    };

    dataStore.appointments[appointmentIndex] = updatedAppointment;

    // Include related doctor and department
    const doctor = updatedAppointment.doctorId
      ? dataStore.doctors.find((d) => d.id === updatedAppointment.doctorId)
      : undefined;
    const department = updatedAppointment.departmentId
      ? dataStore.departments.find((d) => d.id === updatedAppointment.departmentId)
      : undefined;

    return {
      ...updatedAppointment,
      doctor: doctor || null,
      department: department || null,
    };
  },

  async deleteAppointment(id: string) {
    const appointmentIndex = dataStore.appointments.findIndex((a) => a.id === id);
    if (appointmentIndex === -1) return null;

    const [deletedAppointment] = dataStore.appointments.splice(appointmentIndex, 1);
    return deletedAppointment;
  },
};
