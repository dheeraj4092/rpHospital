import dataStore from '../data/store.js';

export const doctorService = {
  async getAllDoctors(filters?: { department?: string; specialty?: string }) {
    let doctors = dataStore.doctors.filter((d) => d.isActive);

    // Filter by specialty
    if (filters?.specialty) {
      const specialtyLower = filters.specialty.toLowerCase();
      doctors = doctors.filter((d) =>
        d.specialty.toLowerCase().includes(specialtyLower)
      );
    }

    // Filter by department
    if (filters?.department) {
      const deptLower = filters.department.toLowerCase();
      doctors = doctors.filter((d) => {
        const dept = dataStore.departments.find((dep) => dep.id === d.departmentId);
        return dept?.name.toLowerCase().includes(deptLower);
      });
    }

    // Include department info and sort
    const result = doctors
      .map((doctor) => {
        const department = dataStore.departments.find((d) => d.id === doctor.departmentId);
        return {
          ...doctor,
          department: department
            ? {
                id: department.id,
                name: department.name,
                description: department.description,
              }
            : null,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    return result;
  },

  async getDoctorById(id: string) {
    const doctor = dataStore.doctors.find((d) => d.id === id);
    if (!doctor) return null;

    const department = dataStore.departments.find((d) => d.id === doctor.departmentId);
    return {
      ...doctor,
      department,
    };
  },

  async getDoctorByName(name: string) {
    const doctor = dataStore.doctors.find((d) => d.name === name);
    if (!doctor) return null;

    const department = dataStore.departments.find((d) => d.id === doctor.departmentId);
    return {
      ...doctor,
      department,
    };
  },
};
