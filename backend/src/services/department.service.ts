import dataStore from '../data/store.js';

export const departmentService = {
  async getAllDepartments() {
    const departments = dataStore.departments
      .filter((d) => d.isActive)
      .map((dept) => {
        const doctorCount = dataStore.doctors.filter(
          (doc) => doc.departmentId === dept.id && doc.isActive
        ).length;
        return {
          ...dept,
          _count: {
            doctors: doctorCount,
          },
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    return departments;
  },

  async getDepartmentById(id: string) {
    const department = dataStore.departments.find((d) => d.id === id);
    if (!department) return null;

    const doctors = dataStore.doctors.filter(
      (doc) => doc.departmentId === id && doc.isActive
    );

    return {
      ...department,
      doctors,
    };
  },

  async getDepartmentByName(name: string) {
    const department = dataStore.departments.find((d) => d.name === name);
    if (!department) return null;

    const doctors = dataStore.doctors.filter(
      (doc) => doc.departmentId === department.id && doc.isActive
    );

    return {
      ...department,
      doctors,
    };
  },
};
