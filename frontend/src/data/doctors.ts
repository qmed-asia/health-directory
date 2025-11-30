// Doctor data from different sources with varying schemas

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

export const doctorsColumbia: DoctorColumbia[] = [
  {
    id: "c1",
    name: "Dr. Sarah Lee",
    specialityTitle: "General Practice",
    designation: "Consultant Physician",
    qualification: "MBBS, MRCP",
    link: "dr-sarah-lee",
    source: 'columbia'
  },
  {
    id: "c2",
    name: "Dr. Ahmad Rahman",
    specialityTitle: "Cardiology",
    designation: "Senior Consultant Cardiologist",
    qualification: "MBBS, MD, FACC",
    link: "dr-ahmad-rahman",
    source: 'columbia'
  },
  {
    id: "c3",
    name: "Dr. Michelle Tan",
    specialityTitle: "Pediatrics",
    designation: "Consultant Pediatrician",
    qualification: "MBBS, MRCPCH",
    link: "dr-michelle-tan",
    source: 'columbia'
  },
  {
    id: "c4",
    name: "Dr. Rajesh Kumar",
    specialityTitle: "Orthopedic Surgery",
    designation: "Consultant Orthopedic Surgeon",
    qualification: "MBBS, MS (Ortho), FRCS",
    link: "dr-rajesh-kumar",
    source: 'columbia'
  }
];

export const doctorsGleneagles: DoctorGleneagles[] = [
  {
    id: "g1",
    title: "Abd Aziz Yahya",
    salutation: "Datuk Dr.",
    specialtyName: "Cardiology##Interventional Cardiology",
    hospitalName: "Gleneagles Hospital Kuala Lumpur",
    languageSpoken: "English, Malay, Mandarin",
    source: 'gleaneagles'
  },
  {
    id: "g2",
    title: "Jennifer Wong",
    salutation: "Dr.",
    specialtyName: "Obstetrics & Gynaecology##Maternal-Fetal Medicine",
    hospitalName: "Gleneagles Hospital Kuala Lumpur",
    languageSpoken: "English, Mandarin, Cantonese",
    source: 'gleaneagles'
  },
  {
    id: "g3",
    title: "Siti Nurhaliza Hassan",
    salutation: "Dr.",
    specialtyName: "Dermatology##Cosmetic Dermatology",
    hospitalName: "Gleneagles Hospital Penang",
    languageSpoken: "English, Malay",
    source: 'gleaneagles'
  },
  {
    id: "g4",
    title: "David Lim",
    salutation: "Prof. Dr.",
    specialtyName: "Neurology##Stroke Medicine",
    hospitalName: "Gleneagles Hospital Penang",
    languageSpoken: "English, Mandarin, Hokkien",
    source: 'gleaneagles'
  }
];

export const doctorsTungshin: DoctorTungshin[] = [
  {
    id: "t1",
    name: "Dr. Chan Wei Ming",
    specialty: "Internal Medicine",
    source: 'tungshin'
  },
  {
    id: "t2",
    name: "Dr. Lim Siew Lan",
    specialty: "Gastroenterology",
    source: 'tungshin'
  },
  {
    id: "t3",
    name: "Dr. Wong Kar Wai",
    specialty: "Traditional Chinese Medicine",
    source: 'tungshin'
  },
  {
    id: "t4",
    name: "Dr. Tan Mei Ling",
    specialty: "Family Medicine",
    source: 'tungshin'
  }
];

export const doctorsGeorgetown: DoctorGeorgetown[] = [
  {
    id: "gt1",
    name: "Dr. Anwar Ibrahim",
    specialty: "General Surgery",
    qualification: "MBBS, MS, FRCS",
    source: 'georgetownspecialist'
  },
  {
    id: "gt2",
    name: "Dr. Priya Devi",
    specialty: "Radiology",
    qualification: "MBBS, DMRD, FRCR",
    source: 'georgetownspecialist'
  },
  {
    id: "gt3",
    name: "Dr. James Tan",
    specialty: "Oncology",
    qualification: "MBBS, MRCP, FRCR",
    source: 'georgetownspecialist'
  },
  {
    id: "gt4",
    name: "Dr. Fatimah Zahra",
    specialty: "Psychiatry",
    qualification: "MBBS, MRCPsych",
    source: 'georgetownspecialist'
  }
];

export const allDoctors: Doctor[] = [
  ...doctorsColumbia,
  ...doctorsGleneagles,
  ...doctorsTungshin,
  ...doctorsGeorgetown
];
