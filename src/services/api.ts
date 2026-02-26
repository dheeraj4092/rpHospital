const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface Doctor {
  id: string;
  name: string;
  qualifications: string[];
  specialty: string;
  experience: number;
  procedures: string[];
  timings: string;
  isGoldMedalist: boolean;
  memberships: string[];
  photoUrl?: string;
  bio?: string;
  department: {
    id: string;
    name: string;
    description: string;
  };
}

export interface HospitalInfo {
  id: string;
  name: string;
  tagline: string;
  established: number;
  address: string;
  phone: string;
  email: string;
  emergencyPhone: string;
  operatingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface CreateAppointmentData {
  patientName: string;
  phone: string;
  doctorId?: string;
  departmentId?: string;
  notes?: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      const data: ApiResponse<T> = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Request failed');
      }

      return data;
    } catch (error: any) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Appointments
  async createAppointment(data: CreateAppointmentData) {
    return this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Doctors
  async getDoctors(filters?: { department?: string; specialty?: string }) {
    const params = new URLSearchParams();
    if (filters?.department) params.append('department', filters.department);
    if (filters?.specialty) params.append('specialty', filters.specialty);

    const queryString = params.toString();
    return this.request<Doctor[]>(
      `/doctors${queryString ? `?${queryString}` : ''}`
    );
  }

  async getDoctorById(id: string) {
    return this.request<Doctor>(`/doctors/${id}`);
  }

  // Hospital Info
  async getHospitalInfo() {
    return this.request<HospitalInfo>('/hospital-info');
  }

  // Departments
  async getDepartments() {
    return this.request('/departments');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const api = new ApiService();
