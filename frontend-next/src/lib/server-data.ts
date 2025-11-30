import { Doctor, Hospital } from './api';

export type { Doctor, Hospital };

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const getHospitals = async (): Promise<Hospital[]> => {
  try {
    // If running at build time or no API available, fallback to empty or implement build-time logic
    // But for Vercel deployment with separate backend, we should fetch from API
    const res = await fetch(`${API_BASE_URL}/api/hospitals`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      // If API returns 404 or error, return empty array instead of throwing
      // This prevents build failures if backend is down
      console.warn(`Failed to fetch hospitals: ${res.status}`);
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return [];
  }
};

export const getDoctors = async (): Promise<Doctor[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/doctors`, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      console.warn(`Failed to fetch doctors: ${res.status}`);
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};

export const getHospitalById = async (id: string): Promise<Hospital | undefined> => {
  const hospitals = await getHospitals();
  return hospitals.find(h => h.id === id);
};

export const getDoctorById = async (id: string): Promise<Doctor | undefined> => {
  const doctors = await getDoctors();
  return doctors.find(d => d.id === id);
};
