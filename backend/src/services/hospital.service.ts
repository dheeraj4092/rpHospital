import dataStore from '../data/store.js';

export const hospitalService = {
  async getHospitalInfo() {
    const hospitalInfo = dataStore.hospitalInfo;

    if (!hospitalInfo) {
      throw new Error('Hospital information not found');
    }

    // Transform for frontend consumption
    return {
      ...hospitalInfo,
      operatingHours: {
        weekdays: hospitalInfo.weekdayHours,
        saturday: hospitalInfo.saturdayHours,
        sunday: hospitalInfo.sundayHours,
      },
      coordinates:
        hospitalInfo.latitude && hospitalInfo.longitude
          ? {
              lat: hospitalInfo.latitude,
              lng: hospitalInfo.longitude,
            }
          : undefined,
    };
  },

  async updateHospitalInfo(data: {
    name?: string;
    tagline?: string;
    address?: string;
    phone?: string;
    email?: string;
    emergencyPhone?: string;
    weekdayHours?: string;
    saturdayHours?: string;
    sundayHours?: string;
    latitude?: number;
    longitude?: number;
  }) {
    if (!dataStore.hospitalInfo) {
      throw new Error('Hospital information not found');
    }

    // Update hospital info
    dataStore.hospitalInfo = {
      ...dataStore.hospitalInfo,
      ...data,
      updatedAt: new Date(),
    };

    return dataStore.hospitalInfo;
  },
};
