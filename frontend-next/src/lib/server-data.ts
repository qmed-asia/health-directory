import fs from 'fs';
import path from 'path';
import { Doctor, Hospital } from './api';

const DATA_DIR = path.join(process.cwd(), 'data');

export const getHospitals = async (): Promise<Hospital[]> => {
  try {
    const filePath = path.join(DATA_DIR, 'hospitals.json');
    if (!fs.existsSync(filePath)) return [];
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    return data.map((item: any, index: number) => ({
      id: index.toString(),
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
    console.error("Error reading hospitals:", error);
    return [];
  }
};

export const getDoctors = async (): Promise<Doctor[]> => {
  try {
    const doctors: Doctor[] = [];
    const files = fs.readdirSync(DATA_DIR);
    
    files.forEach(file => {
      if (file.startsWith('doctors_') && file.endsWith('.json')) {
        const source = file.replace('doctors_', '').replace('.json', '');
        const filePath = path.join(DATA_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const rawData = JSON.parse(fileContent);
        
        const mappedDocs = rawData.map((item: any, index: number) => {
          if (source === 'columbia') {
             return {
               id: `c_${index}`,
               name: item["Name"],
               specialityTitle: item["Speciality Title"],
               designation: item["Designation"] || "",
               qualification: item["Qualification"] || "",
               link: item["Link"] || "",
               source: 'columbia'
             };
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
              };
          }
          else if (source === 'tungshin') {
              return {
                  id: `t_${index}`,
                  name: item["Name"],
                  specialty: item["Specialty"],
                  source: 'tungshin'
              };
          }
          else if (source === 'georgetownspecialist') {
              return {
                  id: `gt_${index}`,
                  name: item["Name"],
                  specialty: item["Specialty"],
                  qualification: item["Qualification"] || "",
                  source: 'georgetownspecialist'
              };
          }
          return null;
        }).filter(Boolean);
        
        doctors.push(...mappedDocs);
      }
    });
    
    return doctors;
  } catch (error) {
    console.error("Error reading doctors:", error);
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
