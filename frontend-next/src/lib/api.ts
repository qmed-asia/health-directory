// frontend/src/lib/api.ts

export interface Hospital {
  id: string;
  name: string;
  hospitalGroup: string;
  address: string;
  city: string;
  state: string;
  telephone: string;
  website: string;
  doctorDirectory: string;
}

export interface DoctorColumbia {
  id: string;
  name: string;
  specialityTitle: string;
  designation: string;
  qualification: string;
  link: string;
  source: 'columbia';
}

export interface DoctorGleneagles {
  id: string;
  title: string;
  salutation: string;
  specialtyName: string;
  hospitalName: string;
  languageSpoken: string;
  source: 'gleaneagles';
}

export interface DoctorTungshin {
  id: string;
  name: string;
  specialty: string;
  source: 'tungshin';
}

export interface DoctorGeorgetown {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  source: 'georgetownspecialist';
}

export type Doctor = DoctorColumbia | DoctorGleneagles | DoctorTungshin | DoctorGeorgetown;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const fetchHospitals = async (): Promise<Hospital[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/hospitals`);
    if (!response.ok) {
      throw new Error('Failed to fetch hospitals');
    }
    const data = await response.json();
    
    // Map the raw JSON to our interface
    return data.map((item: any, index: number) => ({
      id: index.toString(), // Generate an ID since it's missing
      name: item[""] || item["Hospital Name"] || "Unknown Hospital",
      hospitalGroup: item["HOSPITAL GROUP"] || "",
      address: item["ADDRESS"] || "",
      city: item["CITY"] || "",
      state: item["STATE"] || "",
      telephone: item["NO. TELEPHONE"] || "",
      website: item["Website"] || "",
      doctorDirectory: item["Doctor Directory"] || ""
    }));
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return [];
  }
};

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/doctors`);
    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }
    const data = await response.json();
    
    // Map raw data to typed Doctor objects
    return data.map((item: any, index: number) => {
      // Use the source field we added in the backend
      const source = item.source;

      if (source === 'columbia') {
         return {
           id: `c_${index}`,
           name: item["Name"],
           specialityTitle: item["Speciality Title"],
           designation: item["Designation"] || "",
           qualification: item["Qualification"] || "",
           link: item["Link"] || "",
           source: 'columbia'
         } as DoctorColumbia;
      }
      else if (source === 'gleaneagles') {
          return {
              id: item["Id"] || `g_${index}`,
              title: item["Title"] || item["UrlName"] || "",
              salutation: item["Salutation"] || "",
              specialtyName: item["SpecialtyName"],
              hospitalName: item["HospitalName"] || "",
              languageSpoken: item["LanguageSpoken"] || "",
              source: 'gleaneagles'
          } as DoctorGleneagles;
      }
      else if (source === 'tungshin') {
          return {
              id: `t_${index}`,
              name: item["Name"],
              specialty: item["Specialty"],
              source: 'tungshin'
          } as DoctorTungshin;
      }
      else if (source === 'georgetownspecialist') {
          return {
              id: `gt_${index}`,
              name: item["Name"],
              specialty: item["Specialty"],
              qualification: item["Qualification"] || "",
              source: 'georgetownspecialist'
          } as DoctorGeorgetown;
      }
      return null;
    }).filter(Boolean) as Doctor[];
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};
